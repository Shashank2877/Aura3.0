"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, User, Plus, Send } from "lucide-react";
import { format } from "date-fns";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const suggestions = [
  "How can I manage my anxiety better?",
  "I've been feeling overwhelmed lately",
  "Can we talk about improving sleep?",
  "I need help with work-life balance",
];

const motivationalQuotes = [
  "Remember: Every emotion is valid. Take a deep breath.",
  "You are stronger than you think.",
  "Progress, not perfection.",
  "It's okay to ask for help.",
  "Small steps every day.",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]); // {role: "user"|"assistant", content, timestamp}
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * motivationalQuotes.length));
  const notificationRef = useRef<HTMLAudioElement | null>(null);

  // On mount, check for saved mood and add a personalized greeting
  useEffect(() => {
    if (typeof window !== "undefined") {
      const moodData = sessionStorage.getItem("userMood");
      if (moodData) {
        const { label, icon } = JSON.parse(moodData);
        let greeting = "";
        if (label === "Very Happy" || label === "Happy") {
          greeting = `I'm so glad you're doing so well! ${icon} How can I make your day even better?`;
        } else if (label === "Neutral") {
          greeting = `I'm here to support you! ${icon} How can I help you today?`;
        } else if (label === "Sad" || label === "Very Sad") {
          greeting = `I'm sorry that you are feeling down. I'm here for you. ${icon} Want to talk about what's on your mind?`;
        }
        setMessages([
          {
            role: "assistant",
            content: greeting,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Play sound and animate on new AI message
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].role === "assistant") {
      if (notificationRef.current) {
        notificationRef.current.currentTime = 0;
        notificationRef.current.play();
      }
    }
  }, [messages]);

  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;
    setLoading(true);
    setIsTyping(true);
    const userMsg: ChatMessage = { role: "user", content: msg, timestamp: new Date().toISOString() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      console.log("API Response:", data); // Debug log
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: data.response || "No response received", timestamp: new Date().toISOString() },
      ]);
    } catch (e) {
      console.error("Chat error:", e); // Debug log
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: "Sorry, something went wrong. Please try again.", timestamp: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex min-h-[80vh] w-full max-w-7xl mx-auto mt-8 rounded-2xl overflow-hidden bg-background/80 border border-white/10 shadow-xl"
    >
      {/* Notification sound */}
      <audio ref={notificationRef} src="/new-notification-09-352705.mp3" preload="auto" />
      {/* Left panel */}
      <aside className="w-64 bg-black/40 dark:bg-white/5 border-r border-white/10 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold">Chat Sessions</span>
          <button className="p-2 rounded hover:bg-primary/10 transition" title="New Session">
            <Plus className="w-5 h-5 text-primary" />
          </button>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 text-muted-foreground hover:bg-primary/10 transition">
          <User className="w-4 h-4" /> New Session
        </button>
        {/* Placeholder for session list */}
      </aside>
      {/* Main chat area */}
      <section className="flex-1 flex flex-col">
        {/* Welcome banner */}
        <div className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary/10 to-background/80 border-b border-white/10 mt-8 mb-2">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
            <Bot className="w-7 h-7 text-primary" />
          </span>
          <div>
            <div className="text-xl font-bold">Welcome back, Shashank! 🌱</div>
            <div className="text-muted-foreground">Aura, your AI Therapist is here for you.</div>
          </div>
        </div>
        {/* Motivational quote */}
        <div className="px-8 py-2 text-center text-primary font-semibold text-base bg-background/80 border-b border-white/10 mt-0">
          {motivationalQuotes[quoteIdx]}
        </div>
        <div className="border-b border-white/10 px-8 py-6">
          <div className="text-lg font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" /> AI Therapist
          </div>
          <div className="text-sm text-muted-foreground mt-1">How can I assist you today?</div>
        </div>
        {/* Suggestions */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="rounded-lg border border-white/10 bg-black/30 dark:bg-white/10 px-6 py-4 text-left text-base font-medium text-foreground hover:bg-primary/10 transition"
                  onClick={() => sendMessage(s)}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Chat history */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={msg.role === "assistant" ? { opacity: 0, x: -30 } : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: msg.role === "assistant" ? -30 : 30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={clsx("flex gap-3 items-start", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                {msg.role === "assistant" && (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Bot className="w-6 h-6 text-primary" />
                  </span>
                )}
                <div className={clsx("max-w-lg px-4 py-3 rounded-xl shadow", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card/80 text-foreground")}> 
                  <div className="whitespace-pre-line">{msg.content}</div>
                  <div className="text-xs text-muted-foreground mt-2 text-right">
                    {format(new Date(msg.timestamp), "hh:mm a")}
                  </div>
                </div>
                {msg.role === "user" && (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <User className="w-6 h-6 text-primary" />
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3 items-start justify-start">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 animate-pulse">
                <Bot className="w-6 h-6 text-primary" />
              </span>
              <div className="max-w-lg px-4 py-3 rounded-xl shadow bg-card/80 text-foreground flex items-center">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">AI Therapist</span>
                  <span className="text-xs text-muted-foreground">is typing</span>
                  <span className="relative flex h-3 w-6">
                    <span className="absolute left-0 top-0 h-3 w-1.5 rounded-full bg-primary opacity-70 animate-bounce [animation-delay:0s]"></span>
                    <span className="absolute left-2 top-0 h-3 w-1.5 rounded-full bg-primary opacity-70 animate-bounce [animation-delay:0.15s]"></span>
                    <span className="absolute left-4 top-0 h-3 w-1.5 rounded-full bg-primary opacity-70 animate-bounce [animation-delay:0.3s]"></span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Input */}
        <form
          className="flex items-center gap-3 border-t border-white/10 px-8 py-4 bg-background relative"
          onSubmit={e => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <div className="relative flex-1">
            <input
              className="w-full rounded-lg bg-black/10 dark:bg-white/10 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              disabled={loading}
              autoFocus
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary/10"
              onClick={() => setShowEmoji((v) => !v)}
              tabIndex={-1}
            >
              😊
            </button>
            {showEmoji && (
              <div className="absolute bottom-12 left-0 z-50">
                <Picker
                  data={data}
                  onEmojiSelect={(emoji: any) => {
                    setInput(input + (emoji.native || ""));
                    setShowEmoji(false);
                  }}
                  theme="dark"
                  previewPosition="none"
                  searchPosition="none"
                  style={{ borderRadius: 12 }}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50"
            disabled={loading || !input.trim()}
            title="Send"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </section>
    </motion.div>
  );
} 