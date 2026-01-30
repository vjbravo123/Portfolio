"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NewsletterSection = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section className="relative w-full px-4 py-20">
      {/* Glow background */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-background/60 backdrop-blur-xl shadow-xl">
        {/* mesh gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0,transparent_60%)]" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.12)_0,transparent_60%)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-14 items-center">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              Weekly Newsletter
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Level up your{" "}
              <span className="bg-gradient-to-r from-pink-350 to-pink-500 bg-clip-text text-transparent">
                coding game
              </span>
            </h2>

            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              No spam. Just deep dives into React, System Design, and the future of AI.
              Practical content for real developers.
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-full">
            {status === "success" ? (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 animate-in fade-in zoom-in">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <div>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    You&apos;re subscribed!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check your inbox for your welcome guide.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group flex flex-col gap-3 rounded-2xl border bg-background/70 p-2 transition focus-within:ring-2 focus-within:ring-primary/30">
                  <div className="flex items-center gap-3 px-4">
                    <Mail className="text-muted-foreground" />
                    <input
                      type="email"
                      required
                      disabled={status === "loading"}
                      placeholder="you@devmail.com"
                      className="w-full bg-transparent py-4 outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      "h-12 rounded-xl font-semibold transition-all",
                      "bg-primary hover:scale-[1.02] hover:shadow-lg active:scale-[0.97]"
                    )}
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe <ArrowRight size={18} />
                      </span>
                    )}
                  </Button>
                </div>

                <p className="text-center lg:text-left text-[11px] uppercase tracking-widest text-muted-foreground/60">
                  Join 10,000+ developers already learning 🚀
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
