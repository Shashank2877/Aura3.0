'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <motion.main
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-screen items-center justify-center bg-background text-foreground transition-colors overflow-auto"
    >
      <Card className="relative w-full max-w-md p-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-card/80 to-primary/10 shadow-2xl shadow-primary/20 dark:shadow-primary/40 backdrop-blur-lg transition-colors max-h-[80vh] overflow-auto">
        {/* Decorative Icon */}
        <div className="flex justify-center mt-4 mb-2">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/90 shadow-lg shadow-primary/30 ring-4 ring-primary/20">
            <Sparkles className="h-10 w-10 text-white drop-shadow-lg" />
          </span>
        </div>
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text drop-shadow-lg">
          Register
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold text-sm tracking-wide">Name</label>
            <div className="flex items-center border border-primary/20 rounded-lg px-3 py-2 bg-input/60 dark:bg-input/40 focus-within:ring-2 focus-within:ring-primary transition">
              <User className="w-5 h-5 mr-2 text-primary/70" />
              <Input
                type="text"
                className="w-full p-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm tracking-wide">Email</label>
            <div className="flex items-center border border-primary/20 rounded-lg px-3 py-2 bg-input/60 dark:bg-input/40 focus-within:ring-2 focus-within:ring-primary transition">
              <Mail className="w-5 h-5 mr-2 text-primary/70" />
              <Input
                type="email"
                className="w-full p-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm tracking-wide">Password</label>
            <div className="flex items-center border border-primary/20 rounded-lg px-3 py-2 bg-input/60 dark:bg-input/40 focus-within:ring-2 focus-within:ring-primary transition">
              <Lock className="w-5 h-5 mr-2 text-primary/70" />
              <Input
                type="password"
                className="w-full p-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-sm tracking-wide">Confirm Password</label>
            <div className="flex items-center border border-primary/20 rounded-lg px-3 py-2 bg-input/60 dark:bg-input/40 focus-within:ring-2 focus-within:ring-primary transition">
              <Lock className="w-5 h-5 mr-2 text-primary/70" />
              <Input
                type="password"
                className="w-full p-2 outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-2.5 rounded-lg font-bold shadow-md hover:from-primary/90 hover:to-primary/70 transition-all duration-200 focus:ring-2 focus:ring-primary/60"
          >
            Register
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </Card>
    </motion.main>
  );
} 