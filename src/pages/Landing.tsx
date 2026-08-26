export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-[932px] bg-[#0a0a0a] relative overflow-hidden flex flex-col">
        {/* Status Bar Space */}
        <div className="h-14" />

        {/* Logo Section */}
        <div className="flex justify-center pt-8 pb-16">
          <div className="w-[140px] h-[140px] bg-[#1a1a1a] rounded-[32px] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Gradient glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent" />
            
            {/* H Logo with circuit lines */}
            <svg
              viewBox="0 0 80 70"
              className="w-[80px] h-[70px] relative z-10"
              fill="none"
            >
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              
              {/* H letterform with circuit lines */}
              <path
                d="M20 15 L20 55 M60 15 L60 55 M20 35 L60 35"
                stroke="url(#logo-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Circuit dots */}
              <circle cx="20" cy="15" r="2" fill="#a855f7" />
              <circle cx="60" cy="15" r="2" fill="#f97316" />
              <circle cx="20" cy="55" r="2" fill="#a855f7" />
              <circle cx="60" cy="55" r="2" fill="#f97316" />
              
              {/* Decorative circuit lines */}
              <path
                d="M25 20 L35 20 L35 25"
                stroke="#a855f7"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M55 20 L45 20 L45 25"
                stroke="#f97316"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M25 50 L35 50 L35 45"
                stroke="#a855f7"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M55 50 L45 50 L45 45"
                stroke="#f97316"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />
              
              {/* Flowing curves */}
              <path
                d="M30 28 Q40 32 50 28"
                stroke="url(#logo-gradient)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M30 42 Q40 38 50 42"
                stroke="url(#logo-gradient)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
            </svg>
            
            {/* HabiLex text */}
            <span
              className="relative z-10 mt-1 text-[16px] font-semibold tracking-wide"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HabiLex
            </span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="px-6 flex flex-col gap-4">
          {/* Username */}
          <div className="bg-[#1c1c1e] rounded-2xl h-[60px] flex items-center px-5 border border-white/[0.08]">
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-transparent text-white text-[17px] outline-none placeholder:text-white/40"
            />
          </div>

          {/* Password */}
          <div className="bg-[#1c1c1e] rounded-2xl h-[60px] flex items-center justify-center px-5 border border-white/[0.08]">
            <input
              type="password"
              placeholder="password"
              className="w-full bg-transparent text-white text-[17px] text-center outline-none placeholder:text-white/40"
            />
          </div>

          {/* Confirm Password */}
          <div className="bg-[#1c1c1e] rounded-2xl h-[60px] flex items-center justify-center px-5 border border-white/[0.08]">
            <input
              type="password"
              placeholder="password"
              className="w-full bg-transparent text-white text-[17px] text-center outline-none placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="px-6 pt-6">
          <button className="w-full h-[56px] bg-[#0095f6] hover:bg-[#1877f2] rounded-2xl text-white text-[17px] font-semibold transition-colors">
            Next
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Habilex Footer */}
        <div className="flex justify-center pb-6">
          <div className="px-5 py-2 bg-white/[0.06] rounded-full">
            <span className="text-white/80 text-[15px] font-medium tracking-wide">
              habilex
            </span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-3">
          <div className="w-[134px] h-[5px] bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
