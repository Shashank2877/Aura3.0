'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AudioWaveform, Wind, Flower2, TreePine, Waves, Clock, Heart, Smile } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { format } from "date-fns";
import React from "react"; // Added for useEffect

export default function DashboardPage() {
  // Placeholder: In a real app, get this from user context or API
  const [userName] = useState("Shashank R Prakash");
  const today = format(new Date(), "EEEE, MMMM d");
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [mindfulOpen, setMindfulOpen] = useState(false);
  const [oceanOpen, setOceanOpen] = useState(false);
  const [zenOpen, setZenOpen] = useState(false);
  const [gratitudeOpen, setGratitudeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full fixed top-0 z-50 bg-background/95 backdrop-blur border-b border-primary/10">
        <div className="relative max-w-8xl mx-auto px-4 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 space-x-2 transition-opacity hover:opacity-80" aria-label="Home">
            <AudioWaveform className="h-8 w-8 text-primary animate-pulse-gentle" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">Aura3.0</span>
            </div>
          </Link>
          {/* Navigation and Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
              <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" aria-label="Features">Features</Link>
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" aria-label="About Aura">About Aura</Link>
            </nav>
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Notification Icon Placeholder */}
            <Link href="/dashboard" className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition">Start Chat</Link>
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition">Sign out</button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pt-24 max-w-5xl mx-auto px-4"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}</h1>
        <p className="text-muted-foreground mb-8">{today}</p>
        {/* Dashboard content goes here */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full mb-8">
          {/* Quick Actions Card */}
          <div className="rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-lg shadow-xl p-6 border border-white/10 dark:border-white/10 max-w-2xl w-full transition-all flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                {/* You can replace this with an icon if desired */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10" /></svg>
              </span>
              <div>
                <div className="text-lg font-semibold">Quick Actions</div>
                <div className="text-sm text-muted-foreground">Start your wellness journey</div>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/dashboard/chat" className="w-full rounded-lg bg-gradient-to-r from-primary/40 to-primary/20 text-left px-4 py-3 mb-2 text-white font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10 block">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
                    {/* Chat/therapy icon */}
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="3" y="8" width="13" height="7" rx="2" /><path d="M8 8V6a4 4 0 1 1 8 0v2" /></svg>
                  </span>
                  <div>
                    <div className="font-bold text-lg">Start Therapy</div>
                    <div className="text-xs text-white/80">Begin a new session</div>
                  </div>
                </div>
              </Link>
              <button className="w-full rounded-lg bg-black/40 dark:bg-white/10 text-left px-4 py-3 text-white font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10 flex items-center gap-3" onClick={() => setGratitudeOpen(true)}>
                <Smile className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="font-bold">Log Gratitude</div>
                  <div className="text-xs text-white/80">What are you grateful for?</div>
                </div>
              </button>
              <GratitudeModal open={gratitudeOpen} onOpenChange={setGratitudeOpen} />
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex-1 rounded-lg bg-black/40 dark:bg-white/10 text-left px-4 py-3 text-white font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-900/30">
                          {/* Heart icon */}
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M8 14s6-4.35 6-7.5A3.5 3.5 0 0 0 8 3.5 3.5 3.5 0 0 0 2 6.5C2 9.65 8 14 8 14z" /></svg>
                        </span>
                        <div>
                          <div className="font-bold">Track Mood</div>
                          <div className="text-xs text-white/80">How are you feeling?</div>
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg w-full bg-background/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-2">How are you feeling?</DialogTitle>
                      <DialogDescription className="mb-6">Move the slider to track your current mood</DialogDescription>
                    </DialogHeader>
                    {/* Mood slider and emojis */}
                    <MoodSlider />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex-1 rounded-lg bg-black/40 dark:bg-white/10 text-left px-4 py-3 text-white font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/40 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-900/30">
                          {/* Check-in icon */}
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><circle cx="8" cy="8" r="6" /><path d="M8 4v4l2 2" /></svg>
                        </span>
                        <div>
                          <div className="font-bold">Check-in</div>
                          <div className="text-xs text-white/80">Quick wellness check</div>
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg w-full bg-background/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-2">Log Activity</DialogTitle>
                      <DialogDescription className="mb-6">Record your wellness activity</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <label className="block mb-1 font-semibold text-sm">Activity Type</label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="meditation">Meditation</SelectItem>
                            <SelectItem value="walk">Walk</SelectItem>
                            <SelectItem value="exercise">Exercise</SelectItem>
                            <SelectItem value="journaling">Journaling</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-sm">Name</label>
                        <Input placeholder="Morning Meditation, Evening Walk, etc." />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-sm">Duration (minutes)</label>
                        <Input type="number" placeholder="15" />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-sm">Description (optional)</label>
                        <Input placeholder="How did it go?" />
                      </div>
                      <div className="flex justify-end gap-2 mt-6">
                        <DialogClose asChild>
                          <button type="button" className="px-4 py-2 rounded-md text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition">Cancel</button>
                        </DialogClose>
                        <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 hover:bg-green-300 dark:hover:bg-green-600 transition">Save Activity</button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          {/* Insights Card */}
          <div className="rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-lg shadow-xl p-6 border border-white/10 dark:border-white/10 max-w-md w-full transition-all flex-1 min-w-[320px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                {/* Insights icon */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M13 2v8h8" /><path d="M7.21 7.21A8 8 0 1 0 21 15.89" /></svg>
              </span>
              <div>
                <div className="text-lg font-semibold">Insights</div>
                <div className="text-sm text-muted-foreground">Personalized recommendations based on your activity patterns</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-black/40 dark:bg-white/10 p-4 flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  {/* Calendar icon */}
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="4" width="14" height="13" rx="2" /><path d="M16 2v2M8 2v2M3 10h14" /></svg>
                </span>
                <div>
                  <div className="font-bold text-base">Activity Reminder</div>
                  <div className="text-sm text-muted-foreground">You might benefit from setting smaller, more achievable daily goals.</div>
                </div>
              </div>
              <div className="rounded-xl bg-black/40 dark:bg-white/10 p-4 flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  {/* Moon icon */}
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>
                </span>
                <div>
                  <div className="font-bold text-base">Evening Routine</div>
                  <div className="text-sm text-muted-foreground">You tend to be more active in the evenings. Make sure to wind down before bedtime.</div>
                </div>
              </div>
              <div className="rounded-xl bg-blue-900/30 dark:bg-blue-900/40 p-4 flex gap-3 items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  {/* Mindfulness icon */}
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01M15 9h.01" /></svg>
                </span>
                <div>
                  <div className="font-bold text-base">Mindfulness Opportunity</div>
                  <div className="text-sm text-muted-foreground">Try incorporating more mindfulness activities into your daily routine.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Anxiety Relief Activities Section */}
        <div className="rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-lg shadow-xl p-8 border border-white/10 dark:border-white/10 max-w-6xl w-full mx-auto mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Flower2 className="w-5 h-5 text-primary" />
            </span>
            <div>
              <div className="text-xl font-bold">Anxiety Relief Activities</div>
              <div className="text-sm text-muted-foreground">Interactive exercises to help reduce stress and anxiety</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Card 1 */}
            <div>
              <button
                className="w-full rounded-xl bg-black/40 dark:bg-white/10 p-6 flex flex-col gap-2 shadow-inner border border-white/10 hover:bg-primary/10 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10"
                onClick={() => setBreathingOpen(true)}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-900/30">
                    <Wind className="w-6 h-6 text-blue-400" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-blue-200">Breathing Patterns</div>
                    <div className="text-sm text-muted-foreground">Follow calming breathing exercises with visual guidance</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" /> 5 mins
                </div>
              </button>
              <BreathingPatternsModal open={breathingOpen} onOpenChange={setBreathingOpen} />
            </div>
            {/* Card 2 */}
            <div>
              <button
                className="w-full rounded-xl bg-black/40 dark:bg-white/10 p-6 flex flex-col gap-2 shadow-inner border border-white/10 hover:bg-primary/10 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10"
                onClick={() => setZenOpen(true)}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-rose-900/30">
                    <Flower2 className="w-6 h-6 text-rose-400" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-rose-200">Zen Garden</div>
                    <div className="text-sm text-muted-foreground">Create and maintain your digital peaceful space</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" /> 10 mins
                </div>
              </button>
              <ZenGardenModal open={zenOpen} onOpenChange={setZenOpen} />
            </div>
            {/* Card 3 */}
            <div>
              <button
                className="w-full rounded-xl bg-black/40 dark:bg-white/10 p-6 flex flex-col gap-2 shadow-inner border border-white/10 hover:bg-primary/10 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10"
                onClick={() => setMindfulOpen(true)}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-900/30">
                    <TreePine className="w-6 h-6 text-green-400" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-green-200">Mindful Forest</div>
                    <div className="text-sm text-muted-foreground">Take a peaceful walk through a virtual forest</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" /> 15 mins
                </div>
              </button>
              <MindfulForestModal open={mindfulOpen} onOpenChange={setMindfulOpen} />
            </div>
            {/* Card 4 */}
            <div>
              <button
                className="w-full rounded-xl bg-black/40 dark:bg-white/10 p-6 flex flex-col gap-2 shadow-inner border border-white/10 hover:bg-primary/10 transition transform hover:scale-[1.03] hover:shadow-2xl hover:z-10"
                onClick={() => setOceanOpen(true)}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-900/30">
                    <Waves className="w-6 h-6 text-cyan-400" />
                  </span>
                  <div>
                    <div className="font-bold text-lg text-cyan-200">Ocean Waves</div>
                    <div className="text-sm text-muted-foreground">Match your breath with gentle ocean waves</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" /> 8 mins
                </div>
              </button>
              <OceanWavesModal open={oceanOpen} onOpenChange={setOceanOpen} />
            </div>
          </div>
        </div>
      </motion.main>
      <Toaster position="top-center" richColors />
    </div>
  );
}

function MoodSlider() {
  const [mood, setMood] = useState(50); // 0-100 continuous
  // Define mood ranges and corresponding emoji/label
  const moods = [
    { min: 0, max: 19, icon: "😞", label: "Very Sad" },
    { min: 20, max: 39, icon: "😕", label: "Sad" },
    { min: 40, max: 59, icon: "😊", label: "Neutral" },
    { min: 60, max: 79, icon: "🙂", label: "Happy" },
    { min: 80, max: 100, icon: "😁", label: "Very Happy" },
  ];
  const currentMood = moods.find(m => mood >= m.min && mood <= m.max) || moods[2];
  // For closing the dialog, use a ref to the close button or DialogClose if needed
  const [open, setOpen] = useState(true);
  const handleSave = () => {
    toast.success("Mood updated");
    // Save mood and label in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userMood", JSON.stringify({ mood, label: currentMood.label, icon: currentMood.icon }));
    }
    // Close the dialog by setting open to false if controlled, or let DialogClose handle it
    const dialog = document.querySelector('[role="dialog"]');
    if (dialog) {
      const closeBtn = dialog.querySelector('button[aria-label="Close"]');
      if (closeBtn) (closeBtn as HTMLButtonElement).click();
    }
  };
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <span className="text-5xl mb-2">{currentMood.icon}</span>
        <span className="text-lg font-semibold mb-4">{currentMood.label}</span>
      </div>
      <div className="flex w-full justify-between mb-2 px-2">
        {moods.map((m, i) => (
          <span key={i} className="text-2xl opacity-70">{m.icon}</span>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={mood}
        onChange={e => setMood(Number(e.target.value))}
        className="w-full accent-primary h-2 rounded-lg appearance-none bg-gradient-to-r from-muted to-primary/30 focus:outline-none"
      />
      <button
        className="w-full mt-6 bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 font-semibold py-2 rounded-lg hover:bg-green-300 dark:hover:bg-green-600 transition"
        onClick={handleSave}
        type="button"
      >
        Save Mood
      </button>
    </div>
  );
}

// Add BreathingPatternsModal component
function BreathingPatternsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [round, setRound] = useState(1);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalRounds = 3;
  const inDuration = 4; // seconds
  const outDuration = 4; // seconds

  // Sound cues
  const playSound = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = phase === "in" ? 440 : 330;
    o.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.2);
  };

  // Breathing logic
  const startPhase = (newPhase: "in" | "out", newRound: number) => {
    setPhase(newPhase);
    setProgress(0);
    setRunning(true);
    playSound();
    const duration = newPhase === "in" ? inDuration : outDuration;
    let elapsed = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      elapsed += 0.1;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed >= duration) {
        clearInterval(intervalRef.current!);
        if (newPhase === "in") {
          startPhase("out", newRound);
        } else {
          if (newRound < totalRounds) {
            setRound(newRound + 1);
            startPhase("in", newRound + 1);
          } else {
            setFinished(true);
            setRunning(false);
            setTimeout(() => {
              onOpenChange(false);
              setTimeout(() => {
                setFinished(false);
                setRound(1);
                setPhase("in");
                setProgress(0);
                setRunning(true);
              }, 500);
            }, 2000);
          }
        }
      }
    }, 100);
  };

  // Start on open
  React.useEffect(() => {
    if (open) {
      setRound(1);
      setPhase("in");
      setProgress(0);
      setRunning(true);
      setFinished(false);
      setTimeout(() => startPhase("in", 1), 300);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    // eslint-disable-next-line
  }, [open]);

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRound(1);
    setPhase("in");
    setProgress(0);
    setRunning(true);
    setFinished(false);
    setTimeout(() => startPhase("in", 1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-background/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-2">Breathing Patterns</DialogTitle>
          </DialogHeader>
          {finished ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Wind className="w-16 h-16 text-primary mb-4 animate-pulse" />
              <div className="text-2xl font-bold mb-2">Great job!</div>
              <div className="text-muted-foreground mb-4">You completed all rounds.</div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 w-full">
              <Wind className="w-24 h-24 text-primary mb-6 animate-pulse" />
              <div className="text-3xl font-bold mb-4">
                {phase === "in" ? "Breathe In" : "Breathe Out"}
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <div className="mb-2 text-muted-foreground">Round {round} of {totalRounds}</div>
              <button
                className="mt-2 text-sm font-semibold text-primary hover:underline"
                onClick={handleReset}
                disabled={!running}
              >
                Reset
              </button>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

function MindfulForestModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  React.useEffect(() => {
    if (!open && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
      setCurrentTime(0);
    }
  }, [open]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(1, "0");
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-background/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">Mindful Forest</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center h-64 w-full">
          <TreePine className="w-24 h-24 text-green-400 mb-6 drop-shadow-lg animate-pulse" />
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Volume</span>
            <span className="text-muted-foreground">{Math.round(volume * 100)}%</span>
          </div>
          <div className="w-full flex items-center gap-2 mb-4">
            <span className="text-lg">🔉</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-green-400"
            />
          </div>
          <audio
            ref={audioRef}
            src="/forest-ambience-296528.mp3"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setPlaying(false)}
          />
          <div className="w-full flex items-center justify-between mt-2 mb-2">
            <span className="text-muted-foreground">{formatTime(currentTime)}</span>
            <button
              className="mx-2 p-2 rounded-full bg-green-400/20 hover:bg-green-400/40 transition"
              onClick={handlePlayPause}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="5,3 19,12 5,21 5,3"/></svg>
              )}
            </button>
            <span className="text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OceanWavesModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  React.useEffect(() => {
    if (!open && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
      setCurrentTime(0);
    }
  }, [open]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
      .toString()
      .padStart(1, "0");
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-background/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">Ocean Waves</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center h-64 w-full">
          <Waves className="w-24 h-24 text-cyan-400 mb-6 drop-shadow-lg animate-pulse" />
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Volume</span>
            <span className="text-muted-foreground">{Math.round(volume * 100)}%</span>
          </div>
          <div className="w-full flex items-center gap-2 mb-4">
            <span className="text-lg">🔉</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-cyan-400"
            />
          </div>
          <audio
            ref={audioRef}
            src="/soothing-ocean-waves-372489.mp3"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setPlaying(false)}
          />
          <div className="w-full flex items-center justify-between mt-2 mb-2">
            <span className="text-muted-foreground">{formatTime(currentTime)}</span>
            <button
              className="mx-2 p-2 rounded-full bg-cyan-400/20 hover:bg-cyan-400/40 transition"
              onClick={handlePlayPause}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="5,3 19,12 5,21 5,3"/></svg>
              )}
            </button>
            <span className="text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ZenGardenModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const gridSize = 7;
  const tools = [
    { name: "rock", icon: "⬜" },
    { name: "flower", icon: "🌸" },
    { name: "tree", icon: "🌲" },
    { name: "bush", icon: "🌳" },
  ];
  const [selected, setSelected] = useState("rock");
  const [garden, setGarden] = useState<string[][]>(Array.from({ length: gridSize }, () => Array(gridSize).fill("")));

  React.useEffect(() => {
    if (!open) {
      setGarden(Array.from({ length: gridSize }, () => Array(gridSize).fill("")));
      setSelected("rock");
    }
  }, [open]);

  const handleCellClick = (row: number, col: number) => {
    setGarden((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = tools.find((t) => t.name === selected)?.icon || "";
      return next;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full bg-background/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">Zen Garden</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mb-4">
          {tools.map((tool) => (
            <button
              key={tool.name}
              className={`p-2 rounded-lg text-2xl border-2 ${selected === tool.name ? "border-primary bg-primary/10" : "border-transparent bg-card/40"}`}
              onClick={() => setSelected(tool.name)}
            >
              {tool.icon}
            </button>
          ))}
        </div>
        <div className="bg-black/30 dark:bg-white/10 rounded-xl p-4 flex flex-col items-center">
          <div className="grid grid-cols-7 gap-2">
            {garden.map((row, rowIdx) =>
              row.map((cell, colIdx) => (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  className="w-8 h-8 flex items-center justify-center rounded bg-background/80 border border-white/10 text-2xl hover:bg-primary/10 transition"
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                >
                  {cell || ""}
                </button>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GratitudeModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [entry, setEntry] = useState("");
  const [gratitudes, setGratitudes] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open) {
      const stored = sessionStorage.getItem("gratitudeEntries");
      setGratitudes(stored ? JSON.parse(stored) : []);
      setEntry("");
      setSaved(false);
    }
  }, [open]);

  const handleSave = () => {
    if (!entry.trim()) return;
    const updated = [entry, ...gratitudes];
    setGratitudes(updated);
    sessionStorage.setItem("gratitudeEntries", JSON.stringify(updated));
    setEntry("");
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-background/90 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">Gratitude Journal</DialogTitle>
        </DialogHeader>
        <Smile className="w-16 h-16 text-yellow-400 mb-4 animate-bounce" />
        <div className="text-lg font-semibold mb-2 text-center">What are you grateful for today?</div>
        <textarea
          className="w-full min-h-[60px] rounded-lg bg-black/10 dark:bg-white/10 px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4 resize-none"
          placeholder="Write something positive..."
          value={entry}
          onChange={e => setEntry(e.target.value)}
          maxLength={200}
        />
        <button
          className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-2.5 rounded-lg font-bold shadow-md hover:from-primary/90 hover:to-primary/70 transition-all duration-200 focus:ring-2 focus:ring-primary/60 mb-4 disabled:opacity-60"
          onClick={handleSave}
          disabled={!entry.trim()}
        >
          {saved ? "Saved!" : "Save"}
        </button>
        {gratitudes.length > 0 && (
          <div className="w-full mt-2">
            <div className="text-sm font-semibold mb-2 text-muted-foreground">Today's Entries</div>
            <ul className="space-y-2 max-h-32 overflow-y-auto">
              {gratitudes.map((g, i) => (
                <li key={i} className="flex items-start gap-2 bg-card/60 rounded-lg px-3 py-2 shadow">
                  <Heart className="w-4 h-4 text-pink-400 mt-1" />
                  <span className="text-foreground">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}