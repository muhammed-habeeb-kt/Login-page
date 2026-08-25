import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  Lock,
  Fingerprint,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "AI Face Detection",
    description:
      "Advanced facial recognition verifies your identity in seconds.",
  },
  {
    icon: Lock,
    title: "Anti-Spam Protection",
    description:
      "Blocks virtual numbers and OTP bypass attempts to keep your bot secure.",
  },
  {
    icon: Fingerprint,
    title: "Unique Identity",
    description:
      "Each user is cryptographically linked to their verified face profile.",
  },
];

const steps = [
  "Set your secure credentials",
  "Take a quick video selfie",
  "AI verifies your face match",
  "Account secured and protected",
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-[#0a0a0a] text-white"
    >
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="size-[500px] rounded-full bg-blue-600/5 blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto relative z-10"
        >
          {/* Glowing logo */}
          <div className="mb-8 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-blue-500/30 rounded-full scale-150" />
              <div className="relative size-20 rounded-2xl bg-[#141414] border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                <Shield className="size-10 text-blue-500" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Habilex
          </h1>
          <p className="text-lg text-blue-400 font-medium mb-2">
            Secure Face Verification
          </p>
          <p className="text-white/40 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8">
            Shield your Telegram bot from spam and virtual-number abuse with
            AI-powered face verification. One selfie, one identity, zero spam.
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-base px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all"
          >
            Get Started
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Features */}
      <section className="px-4 py-16 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Why Habilex?
            </h2>
            <p className="text-white/40 max-w-md mx-auto">
              OTPs alone can be bypassed. Face verification cannot.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/[0.06] bg-[#111] p-6 text-center"
              >
                <div className="mb-4 size-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto">
                  <feat.icon className="size-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">{feat.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              How It Works
            </h2>
            <p className="text-white/40">
              Four simple steps to a fully secured account.
            </p>
          </motion.div>

          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-[#111] p-4"
              >
                <div className="size-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-white/70">{step}</p>
                <CheckCircle2 className="size-4 text-white/15 ml-auto shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 bg-white/[0.02]">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 blur-2xl bg-blue-500/20 rounded-full scale-150" />
              <Shield className="relative size-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">
              Ready to Secure Your Bot?
            </h2>
            <p className="text-sm text-white/40 mb-6">
              Join the next generation of Telegram bot security. Verify once,
              stay protected for good.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all"
            >
              Start Verification
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-[11px] text-white/20 border-t border-white/[0.06]">
        habilex
      </footer>
    </motion.div>
  );
}
