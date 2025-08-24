'use client';
import { useEffect, useState } from "react";
import { Ripple } from "@/components/magicui/ripple";
import { motion } from "framer-motion";
import Waves from "@/components/Waves";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeartPulse,
  Lightbulb,
  Lock,
  MessageSquareHeart
} from "lucide-react";
import { Footer } from "@/components/footer";

export default function Home() {
  const emotions = [
    { value: 0, label: "😐", color: "from-blue-500/50" },
    { value: 25, label: "😊 Content", color: "from-green-500/50" },
    { value: 50, label: "🧘 Peaceful", color: "from-purple-500/50" },
    { value: 75, label: "😄 Happy", color: "from-yellow-500/50" },
    { value: 100, label: "✨ Excited", color: "from-pink-500/50" },
  ];
  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion =
    emotions.find(em => Math.abs(emotion - em.value) < 15) || emotions[2];

  return(
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute w-[500px] h-[500px] rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60`}
          />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700" />
          <div className  = "absolute inset-0 bg-background/80 backdrop-blur-3xl"/>
        </div>
        <Ripple className="opacity-60" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative space-y-8 text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)]">
              Find Peace
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              of Mind
            </span>
          </h1>
          <div>
            <Waves className="w-4 h-4 animate-wave text-primary" />
            <span className="relative text-foreground/90 dark:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Your AI Agent Mental Health Companion
            </span>
          </div>
        </motion.div>
        <p className="max-w-[600px] mx-auto text-base md:text-lg text-muted-foreground leading-relaxed tracking-wide">
          Experience a new way of emotional support. Our AI companion is here to listen, understand, and guide you through life's journey.
        </p>
        <div className="space-y-2 text-center mb-8 mt-6">
          <p className="text-sm text-muted-foreground/80 font-medium">
            Whatever you're feeling, we're here to listen
          </p>
          <div className="flex justify-center gap-20 mt-2">
            {emotions.map((em, idx) => (
              <div
                key={em.value}
                className={`flex flex-col items-center transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                  Math.abs(emotion - em.value) < 15
                    ? "opacity-100 scale-110 transform-gpu"
                    : "opacity-50 scale-100"
                }`}
                onClick={() => setEmotion(em.value)}
              >
                <span className="text-2xl">{em.label.split(' ')[0]}</span>
                {idx === 0 ? (
                  <span className="text-xs mt-1 text-muted-foreground">Sad</span>
                ) : (
                  <span className="text-xs mt-1 text-muted-foreground">{em.label.split(' ').slice(1).join(' ')}</span>
                )}
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center mt-8">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[emotion]}
              onValueChange={([val]) => setEmotion(val)}
              className="max-w-xl w-full"
            />
          </div>
          <div className="w-full flex justify-center mt-2">
            <span className="text-sm text-muted-foreground">Slide to express how you're feeling today</span>
          </div>
          <Button
            className="mt-36 group transition-all duration-500 hover:shadow-xl hover:shadow-primary/30 animate-pulse"
          >
            <span className="relative z-10 font-medium flex items-center gap-2">
              Begin Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
          <div className="text-xs mt-2 text-muted-foreground">
            {emotions[0].label.split(' ').slice(1).join(' ')}
          </div>
        </div>
      </section>
      {/* features grid */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4 text-white">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent dark:text-primary/90">
              How Aura Helps You
            </h2>
            <p className="text-foreground dark:text-foreground/95 max-w-2xl mx-auto font-medium text-lg">
              Experience a new kind of emotional support, powered by empathetic AI
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            <div className="rounded-xl bg-background/80 p-6 shadow-md transition-all duration-300 hover:animate-pulse flex flex-col items-center">
              <HeartPulse className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Real-Time Support</h3>
              <p className="text-sm text-muted-foreground text-center">Get instant responses and support whenever you need it most.</p>
            </div>
            <div className="rounded-xl bg-background/80 p-6 shadow-md transition-all duration-300 hover:animate-pulse flex flex-col items-center">
              <Lightbulb className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Personalized Insights</h3>
              <p className="text-sm text-muted-foreground text-center">Receive advice and insights tailored to your emotional state.</p>
            </div>
            <div className="rounded-xl bg-background/80 p-6 shadow-md transition-all duration-300 hover:animate-pulse flex flex-col items-center">
              <Lock className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground text-center">Your conversations are private, secure, and never shared.</p>
            </div>
            <div className="rounded-xl bg-background/80 p-6 shadow-md transition-all duration-300 hover:animate-pulse flex flex-col items-center">
              <MessageSquareHeart className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Empathetic AI</h3>
              <p className="text-sm text-muted-foreground text-center">Interact with an AI designed to understand and support your feelings.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>

  );
}

