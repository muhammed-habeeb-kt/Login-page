import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const verification = useQuery(api.faceVerification.getVerificationStatus);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Habilex Security
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2 self-start"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="size-5" />
            </div>
            <CardTitle>Face Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {verification === undefined ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : verification === null ? (
              <>
                <p className="text-sm leading-6 text-muted-foreground">
                  You haven&apos;t completed face verification yet. Complete the
                  verification process to secure your account.
                </p>
                <Button onClick={() => navigate("/verify")} className="w-full sm:w-auto">
                  Start Verification
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </>
            ) : verification.status === "verified" ? (
              <div className="flex items-center gap-3 text-green-500">
                <div className="size-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="size-4" />
                </div>
                <p className="text-sm font-medium">Your account is verified and secure.</p>
              </div>
            ) : verification.status === "failed" ? (
              <>
                <div className="flex items-center gap-3 text-destructive">
                  <p className="text-sm font-medium">Verification failed. Please try again.</p>
                </div>
                <Button onClick={() => navigate("/verify")} variant="outline" className="w-full sm:w-auto">
                  Retry Verification
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm">
                  Verification {verification.status} — this may take 3-5 hours to complete.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
