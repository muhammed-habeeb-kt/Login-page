import { useState, useRef, useEffect, useCallback } from "react";

type Screen = 1 | 2 | 3 | 4;

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export default function Landing() {
  const [screen, setScreen] = useState<Screen>(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-[932px] bg-[#0a0a0a] relative overflow-hidden flex flex-col">
        {screen === 1 && <Screen1 onNext={() => setScreen(2)} />}
        {screen === 2 && (
          <Screen2
            onBack={() => setScreen(1)}
            onNext={() => setScreen(3)}
          />
        )}
        {screen === 3 && (
          <Screen3 onSuccess={() => setScreen(4)} />
        )}
        {screen === 4 && (
          <Screen4 onBack={() => setScreen(3)} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 1 — Login / Credentials
   ───────────────────────────────────────────── */
function Screen1({ onNext }: { onNext: () => void }) {
  return (
    <>
      <div className="h-14" />

      {/* Logo Section */}
      <div className="flex justify-center pt-8 pb-16">
        <div className="w-[140px] h-[140px] bg-[#1a1a1a] rounded-[32px] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent" />
          <svg viewBox="0 0 80 70" className="w-[80px] h-[70px] relative z-10" fill="none">
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path d="M20 15 L20 55 M60 15 L60 55 M20 35 L60 35" stroke="url(#logo-gradient)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="20" cy="15" r="2" fill="#a855f7" />
            <circle cx="60" cy="15" r="2" fill="#f97316" />
            <circle cx="20" cy="55" r="2" fill="#a855f7" />
            <circle cx="60" cy="55" r="2" fill="#f97316" />
            <path d="M25 20 L35 20 L35 25" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M55 20 L45 20 L45 25" stroke="#f97316" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M25 50 L35 50 L35 45" stroke="#a855f7" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M55 50 L45 50 L45 45" stroke="#f97316" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M30 28 Q40 32 50 28" stroke="url(#logo-gradient)" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M30 42 Q40 38 50 42" stroke="url(#logo-gradient)" strokeWidth="1.5" fill="none" opacity="0.7" />
          </svg>
          <span
            className="relative z-10 mt-1 text-[16px] font-semibold tracking-wide"
            style={{ background: "linear-gradient(135deg, #a855f7, #ec4899, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            HabiLex
          </span>
        </div>
      </div>

      {/* Input Fields */}
      <div className="px-6 flex flex-col gap-4">
        <div className="bg-[#1c1c1e] rounded-2xl h-[60px] flex items-center px-5 border border-white/[0.08]">
          <input type="text" placeholder="Username" className="w-full bg-transparent text-white text-[17px] outline-none placeholder:text-white/40" />
        </div>
        <div className="bg-[#1c1c1e] rounded-2xl h-[60px] flex items-center justify-center px-5 border border-white/[0.08]">
          <input type="password" placeholder="password" className="w-full bg-transparent text-white text-[17px] text-center outline-none placeholder:text-white/40" />
        </div>
        <div className="bg-[#1c1c1e] rounded-2xl h-[60px] flex items-center justify-center px-5 border border-white/[0.08]">
          <input type="password" placeholder="password" className="w-full bg-transparent text-white text-[17px] text-center outline-none placeholder:text-white/40" />
        </div>
      </div>

      <div className="px-6 pt-6">
        <button onClick={onNext} className="w-full h-[56px] bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#0a7ce1] rounded-2xl text-white text-[17px] font-semibold transition-colors">
          Next
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex justify-center pb-6">
        <div className="px-5 py-2 bg-white/[0.06] rounded-full">
          <span className="text-white/80 text-[15px] font-medium tracking-wide">habilex</span>
        </div>
      </div>
      <div className="flex justify-center pb-3">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 2 — Video Selfie Instructions
   ───────────────────────────────────────────── */
function Screen2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <>
      <div className="flex items-center h-14 px-4 shrink-0">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2L2 10L10 18" />
          </svg>
        </button>
        <span className="flex-1 text-center text-white text-[17px] font-semibold pr-10">Video selfie</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-4">
        <div className="relative w-[240px] h-[240px]">
          <svg viewBox="0 0 240 240" width="240" height="240" fill="none" className="absolute inset-0">
            <circle cx="120" cy="120" r="95" stroke="#4a4a4a" strokeWidth="1.5" strokeDasharray="8 6" fill="none" />
            <circle cx="120" cy="105" r="18" stroke="#b0b0b0" strokeWidth="2.5" fill="none" />
            <path d="M82 152 C82 128 98 118 120 118 C142 118 158 128 158 152" stroke="#b0b0b0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="120" cy="25" r="18" fill="#1a1a1e" stroke="#4a4a4a" strokeWidth="1.5" />
            <path d="M113 30 L120 22 L127 30" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="120" cy="215" r="18" fill="#1a1a1e" stroke="#4a4a4a" strokeWidth="1.5" />
            <path d="M113 210 L120 218 L127 210" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="25" cy="120" r="18" fill="#1a1a1e" stroke="#4a4a4a" strokeWidth="1.5" />
            <path d="M30 113 L22 120 L30 127" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="215" cy="120" r="18" fill="#1a1a1e" stroke="#4a4a4a" strokeWidth="1.5" />
            <path d="M210 113 L218 120 L210 127" stroke="#b0b0b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <h1 className="text-white text-[24px] font-bold mt-8 text-center" style={{ fontFamily: FONT }}>
          Take a video selfie
        </h1>
        <p className="text-[#a8a8a8] text-[16px] leading-[1.5] text-center mt-4 max-w-[340px]" style={{ fontFamily: FONT }}>
          To keep your account secure and prevent unauthorized access, we need
          to verify your identity. Please hold your phone directly in front of
          your face and look straight into the camera to take a selfie.
        </p>
      </div>

      <div className="px-6 pb-3 shrink-0">
        <div className="flex items-start gap-3 mb-5">
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" className="shrink-0 mt-[2px]">
            <rect x="2" y="9" width="16" height="12" rx="2.5" stroke="#6e6e6e" strokeWidth="1.8" fill="none" />
            <path d="M6 9V6C6 3.79 7.79 2 10 2C12.21 2 14 3.79 14 6V9" stroke="#6e6e6e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="10" cy="14.5" r="1.5" fill="#6e6e6e" />
          </svg>
          <p className="text-[#8e8e8e] text-[13.5px] leading-[1.45]" style={{ fontFamily: FONT }}>
            This video will never be visible on{" "}
            <span className="text-[#a0a0a0] font-medium">habix</span> and will
            be deleted within 30 days. This won't use face recognition or
            collect biometric data.
          </p>
        </div>
        <button onClick={onNext} className="w-full h-[56px] bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#0a7ce1] rounded-2xl text-white text-[17px] font-semibold transition-colors">
          Next
        </button>
      </div>
      <div className="flex justify-center pb-3 shrink-0">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 3 — Live Camera Capture
   ───────────────────────────────────────────── */
function Screen3({ onSuccess }: { onSuccess: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [borderColor, setBorderColor] = useState("#ffffff");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Start the front camera on mount
  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setCameraActive(true);
      } catch (err) {
        if (!cancelled) {
          setCameraError(
            err instanceof DOMException && err.name === "NotAllowedError"
              ? "Camera permission denied. Please allow camera access and reload."
              : "Could not access camera. Make sure a front camera is available."
          );
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Keyboard shortcuts for simulation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "s" || e.key === "S") {
        setBorderColor("#00FF00");
      } else if (e.key === "f" || e.key === "F") {
        setBorderColor("#FF0000");
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto-transition to Screen 4 after 1.5s on success
  useEffect(() => {
    if (borderColor !== "#00FF00") return;

    const timer = setTimeout(() => {
      // Stop the camera before transitioning
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      onSuccess();
    }, 1500);

    return () => clearTimeout(timer);
  }, [borderColor, onSuccess]);

  return (
    <>
      <div className="flex items-center justify-center h-14 shrink-0">
        <span className="text-white text-[17px] font-semibold">Video selfie</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-4">
        <div
          className="relative rounded-full overflow-hidden shrink-0 transition-colors duration-300"
          style={{ width: 280, height: 280, border: `4px solid ${borderColor}` }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          {!cameraActive && !cameraError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1e]">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          {cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1e] p-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-3 text-white/40">
                <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="text-white/50 text-[13px] text-center leading-snug">{cameraError}</p>
            </div>
          )}
        </div>

        <h2 className="text-white text-[22px] font-bold mt-8 text-center" style={{ fontFamily: FONT }}>
          Position your face in the circle.
        </h2>
        <p className="text-[#a8a8a8] text-[16px] leading-[1.5] text-center mt-3 max-w-[320px]" style={{ fontFamily: FONT }}>
          Hold your phone at eye level and make sure that your whole face is visible.
        </p>
      </div>

      <div className="flex justify-center pb-3 shrink-0">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 4 — Success / Video Selfie Complete
   ───────────────────────────────────────────── */
function Screen4({ onBack }: { onBack: () => void }) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center h-14 px-4 shrink-0">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2L2 10L10 18" />
          </svg>
        </button>
        <span className="flex-1 text-center text-white text-[17px] font-semibold pr-10">Video selfie</span>
      </div>

      {/* Center — Gradient Circle + Checkmark */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-4">
        <div className="relative w-[260px] h-[260px] shrink-0">
          <svg viewBox="0 0 260 260" width="260" height="260" fill="none">
            <defs>
              {/* Gradient for ring + check: yellow/orange bottom-left → pink/magenta top-right */}
              <linearGradient id="success-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f5a623" />
                <stop offset="35%" stopColor="#e8445a" />
                <stop offset="70%" stopColor="#d63384" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* Gradient ring — thin stroke circle */}
            <circle
              cx="130"
              cy="130"
              r="120"
              stroke="url(#success-grad)"
              strokeWidth="4"
              fill="none"
            />

            {/* Checkmark */}
            <path
              d="M85 132 L118 165 L178 100"
              stroke="url(#success-grad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-white text-[24px] font-bold mt-10 text-center" style={{ fontFamily: FONT }}>
          Video selfie complete
        </h1>

        {/* Paragraph */}
        <p className="text-[#a8a8a8] text-[16px] leading-[1.5] text-center mt-4 max-w-[340px]" style={{ fontFamily: FONT }}>
          Thank you for completing this step. Please submit this selfie to help
          us secure your account and prevent unauthorized access.
        </p>
      </div>

      {/* Footer — Privacy + Button */}
      <div className="px-6 pb-3 shrink-0">
        <div className="flex items-start gap-3 mb-5">
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" className="shrink-0 mt-[2px]">
            <rect x="2" y="9" width="16" height="12" rx="2.5" stroke="#6e6e6e" strokeWidth="1.8" fill="none" />
            <path d="M6 9V6C6 3.79 7.79 2 10 2C12.21 2 14 3.79 14 6V9" stroke="#6e6e6e" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="10" cy="14.5" r="1.5" fill="#6e6e6e" />
          </svg>
          <p className="text-[#8e8e8e] text-[13.5px] leading-[1.45]" style={{ fontFamily: FONT }}>
            This video will never be visible on{" "}
            <span className="text-[#a0a0a0] font-medium">habilex</span> and will
            be deleted within 30 days. This won't use face recognition or
            collect biometric data.
          </p>
        </div>

        <button className="w-full h-[56px] bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#0a7ce1] rounded-2xl text-white text-[17px] font-semibold transition-colors">
          Submit
        </button>
      </div>

      <div className="flex justify-center pb-3 shrink-0">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </>
  );
}
