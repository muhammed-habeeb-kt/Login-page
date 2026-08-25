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
      "Advanced facial recognition technology verifies your identity in seconds.",
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
  "Account secured & protected",
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="size-[500px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto relative z-10"
        >
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center">
            <div className="size-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="size-10 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Habilex
          </h1>
          <p className="text-lg text-primary font-medium mb-2">
            Secure Face Verification
          </p>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-8">
            Shield your Telegram bot from spam and virtual-number abuse with
            AI-powered face verification. One selfie, one identity, zero spam.
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-base px-8"
          >
            Get Started
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="px-4 py-16 bg-muted/30">
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
            <p className="text-muted-foreground max-w-md mx-auto">
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
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <div className="mb-4 size-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <feat.icon className="size-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
            <p className="text-muted-foreground">
              Four simple steps to a fully secured account.
            </p>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
              >
                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm font-medium">{step}</p>
                <CheckCircle2 className="size-4 text-muted-foreground/30 ml-auto shrink-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="size-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">
              Ready to Secure Your Bot?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Join the next generation of Telegram bot security. Verify once,
              stay protected for good.
            </p>
            <Button size="lg" onClick={() => navigate("/auth")} className="px-8">
              Start Verification
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border/50">
        Habilex
      </footer>
    </motion.div>
  );
}
