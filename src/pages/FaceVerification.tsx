import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Shield, HelpCircle, X } from "lucide-react";

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
          onBack={() => setScreen("camera")}
          onSubmit={() => {
            console.log("Verification submitted");
            setScreen("warning");
          }}
        />
      )}
      {screen === "warning" && (
        <WarningScreen
          onClose={() => {
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
    <div className="flex-1 flex flex-col items-center px-5 pt-16 pb-6">
      {/* Logo */}
      <div className="mb-4 flex flex-col items-center">
        <div className="relative mb-3">
          <div className="absolute inset-0 blur-3xl bg-purple-500/20 rounded-full scale-[1.8]" />
          <div className="relative size-28 rounded-[1.4rem] bg-[#111] border border-white/[0.08] flex items-center justify-center overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.12)]">
            {/* Stylised H logo */}
            <svg viewBox="0 0 80 80" className="size-20" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {/* Vertical bars */}
              <rect x="16" y="10" width="4" height="60" rx="2" fill="url(#logoGrad)" opacity="0.6" />
              <rect x="26" y="14" width="3" height="52" rx="1.5" fill="url(#logoGrad)" opacity="0.4" />
              <rect x="34" y="8" width="3" height="64" rx="1.5" fill="url(#logoGrad)" opacity="0.5" />
              <rect x="42" y="12" width="4" height="56" rx="2" fill="url(#logoGrad)" opacity="0.7" />
              <rect x="52" y="6" width="3" height="68" rx="1.5" fill="url(#logoGrad)" opacity="0.4" />
              <rect x="60" y="16" width="3" height="48" rx="1.5" fill="url(#logoGrad)" opacity="0.3" />
              {/* Crossbar curve */}
              <path
                d="M18 38 C28 28, 52 48, 62 38"
                stroke="url(#logoGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M18 44 C28 34, 52 54, 62 44"
                stroke="url(#logoGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>
        <span className="text-lg font-semibold tracking-wide text-white/90">
          Habi<span className="text-white">Lex</span>
        </span>
      </div>

      {/* Inputs */}
      <div className="w-full max-w-sm space-y-3.5 mt-12">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-[52px] px-5 rounded-2xl bg-transparent border border-white/[0.12] text-white text-[15px] placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-[52px] px-5 rounded-2xl bg-transparent border border-white/[0.12] text-white text-[15px] placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
        />
        <input
          type="password"
          placeholder="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`w-full h-[52px] px-5 rounded-2xl bg-transparent border text-white text-[15px] placeholder:text-white/25 outline-none transition-colors ${
            confirmPassword && !passwordsMatch
              ? "border-red-500/50"
              : "border-white/[0.12] focus:border-white/25"
          }`}
        />
        {confirmPassword && !passwordsMatch && (
          <p className="text-xs text-red-400 -mt-1 pl-1">Passwords do not match</p>
        )}
      </div>

      {/* Next button */}
      <Button
        onClick={onNext}
        disabled={!passwordsMatch || !username.trim()}
        className="mt-6 w-full max-w-sm h-[52px] rounded-2xl bg-[#0095f6] hover:bg-[#1a9ff5] text-white font-semibold text-[15px] disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(0,149,246,0.15)]"
      >
        Next
      </Button>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <span className="text-[13px] text-white/30 tracking-wider font-medium px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
          habilex
        </span>
      </div>
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
    <div className="flex-1 flex flex-col px-5 py-5">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="size-9 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="size-5 text-white/70" />
        </button>
        <span className="text-[15px] font-medium text-white/80">Video selfie</span>
      </div>

      {/* Face icon with dotted circle — no arrows */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 relative">
          <svg viewBox="0 0 200 200" className="size-48" fill="none">
            {/* Dotted circle */}
            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              opacity="0.2"
            />
            {/* Face icon */}
            <circle cx="100" cy="78" r="20" stroke="white" strokeWidth="2" opacity="0.5" />
            <path
              d="M60 136 C60 110 80 98 100 98 C120 98 140 110 140 136"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>

        <h1 className="text-[22px] font-semibold text-white mb-4 text-center">
          Take a video selfie
        </h1>
        <p className="text-[15px] text-white/40 text-center max-w-[320px] leading-relaxed mb-10 px-2">
          To keep your account secure and prevent unauthorized access, we need to
          verify your identity. Please hold your phone directly in front of your
          face and look straight into the camera to take a selfie.
        </p>

        {/* Privacy note — matches reference: says "habix" */}
        <div className="flex items-start gap-3 mb-8 px-1 w-full max-w-sm">
          <Lock className="size-5 text-white/20 shrink-0 mt-0.5" />
          <p className="text-[13px] text-white/30 leading-relaxed">
            This video will never be visible on{" "}
            <span className="text-white/40 font-medium">habix</span> and will be
            deleted within 30 days. This won't use face recognition or collect
            biometric data.
          </p>
        </div>

        <Button
          onClick={onNext}
          className="w-full h-[52px] rounded-2xl bg-[#0095f6] hover:bg-[#1a9ff5] text-white font-semibold text-[15px] transition-all shadow-[0_0_20px_rgba(0,149,246,0.15)]"
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
    <div className="flex-1 flex flex-col px-5 py-5">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[15px] font-medium text-white/80">Video selfie</span>
        <button className="text-[15px] text-white/60 hover:text-white/80 transition-colors">
          Help
        </button>
      </div>

      {/* Camera circle with white border */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative size-[300px] sm:size-[340px] rounded-full overflow-hidden border-[3px] border-white/80 mb-8">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="size-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          {!isActive && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/70">
              <div className="size-10 border-2 border-white/15 border-t-white/60 rounded-full animate-spin" />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 p-8">
              <p className="text-sm text-red-400 text-center">{error}</p>
            </div>
          )}
        </div>

        <h2 className="text-lg font-semibold text-white mb-2 text-center">
          Position your face in the circle.
        </h2>
        <p className="text-[14px] text-white/35 text-center max-w-[280px] leading-relaxed">
          Hold your phone at eye level and make sure that your whole face is visible.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCREEN 4 — Success UI
   ═══════════════════════════════════════════════════════════ */

function SuccessScreen({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col px-5 py-5">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="size-9 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="size-5 text-white/70" />
        </button>
        <span className="text-[15px] font-medium text-white/80">Video selfie</span>
      </div>

      {/* Gradient ring with checkmark */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <svg viewBox="0 0 200 200" className="size-52 sm:size-60" fill="none">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="40%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
              <linearGradient id="checkGrad" x1="30%" y1="100%" x2="70%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            {/* Gradient ring */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="url(#ringGrad)"
              strokeWidth="4"
              fill="none"
            />
            {/* Checkmark */}
            <path
              d="M62 102 L88 128 L138 74"
              stroke="url(#checkGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <h1 className="text-[22px] font-semibold text-white mb-3 text-center">
          Video selfie complete
        </h1>
        <p className="text-[15px] text-white/40 text-center max-w-[320px] leading-relaxed mb-10 px-2">
          Thank you for completing this step. Please submit this selfie to help us
          secure your account and prevent unauthorized access.
        </p>

        {/* Privacy note — says "habilex" */}
        <div className="flex items-start gap-3 mb-8 px-1 w-full max-w-sm">
          <Lock className="size-5 text-white/20 shrink-0 mt-0.5" />
          <p className="text-[13px] text-white/30 leading-relaxed">
            This video will never be visible on{" "}
            <span className="text-white/40 font-medium">habilex</span> and will be
            deleted within 30 days. This won't use face recognition or collect
            biometric data.
          </p>
        </div>

        <Button
          onClick={onSubmit}
          className="w-full h-[52px] rounded-2xl bg-[#0095f6] hover:bg-[#1a9ff5] text-white font-semibold text-[15px] transition-all shadow-[0_0_20px_rgba(0,149,246,0.15)]"
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

function WarningScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col px-5 py-5">
      {/* Close button */}
      <button
        onClick={onClose}
        className="size-9 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors mb-2"
      >
        <X className="size-5 text-white/60" />
      </button>

      {/* Shield + decorative icons */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8 relative flex items-center justify-center gap-0">
          {/* Decorative left icon */}
          <div className="relative -mr-2 z-0">
            <svg viewBox="0 0 40 60" className="size-10 opacity-20" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="6" y="4" width="28" height="22" rx="4" />
              <path d="M20 26 L20 50" />
              <path d="M14 50 L26 50" />
              <circle cx="20" cy="15" r="4" />
            </svg>
          </div>

          {/* Main glowing shield */}
          <div className="relative z-10 mx-1">
            <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-orange-500/30 via-pink-500/25 to-purple-500/20 rounded-full scale-[2.2]" />
            <svg viewBox="0 0 80 90" className="relative size-20" fill="none">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path
                d="M40 6 L72 20 L72 42 C72 62 58 76 40 84 C22 76 8 62 8 42 L8 20 Z"
                stroke="url(#shieldGrad)"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Padlock */}
              <rect x="32" y="38" width="16" height="14" rx="3" stroke="white" strokeWidth="1.5" opacity="0.7" />
              <path d="M35 38 L35 32 C35 27 37 24 40 24 C43 24 45 27 45 32 L45 38" stroke="white" strokeWidth="1.5" opacity="0.7" />
              <circle cx="40" cy="44" r="1.5" fill="white" opacity="0.7" />
            </svg>
          </div>

          {/* Decorative right icon */}
          <div className="relative -ml-2 z-0">
            <svg viewBox="0 0 40 60" className="size-10 opacity-20" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="6" y="4" width="28" height="22" rx="4" />
              <path d="M20 26 L20 50" />
              <path d="M14 50 L26 50" />
              <rect x="12" y="9" width="16" height="12" rx="1" />
              <path d="M12 18 L20 13 L28 18" />
            </svg>
          </div>
        </div>

        <h1 className="text-[22px] font-semibold text-white mb-4 text-center leading-tight">
          Security Verification in Progress
        </h1>
        <p className="text-[15px] text-white/40 text-center max-w-[340px] leading-relaxed px-2">
          Your account security verification is currently processing. This may
          take 3 to 5 hours to complete. To ensure your safety, any new attempts
          to log into your account during this time will be automatically blocked.
        </p>

        {/* Divider */}
        <div className="w-full max-w-sm border-t border-white/[0.06] my-10" />
      </div>

      {/* Okay button — pinned to bottom */}
      <Button
        onClick={onClose}
        className="w-full h-[52px] rounded-2xl bg-[#0095f6] hover:bg-[#1a9ff5] text-white font-semibold text-[15px] transition-all shadow-[0_0_20px_rgba(0,149,246,0.15)]"
      >
        Okay
      </Button>
    </div>
  );
}
