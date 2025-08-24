'use client';

import Link from "next/link";
import { AudioWaveform, MenuIcon } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SignInButton } from "./sign-in-button";
import { useState } from "react";
import { Button } from "./ui/button";

export function Header() {
    const navItems = [
        { href: "/features", label: "Features" },
        { href: "/about", label: "About Aura" },
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="w-full fixed top-0 z-50 bg-background/95 backdrop-blur">
            <div className="absolute inset-0 border-b border-primary/10"></div>
            <header className="relative max-w-8xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 space-x-2 transition-opacity hover:opacity-80" aria-label="Home">
                        <AudioWaveform className="h-8 w-8 text-primary animate-pulse-gentle" />
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">Aura3.0</span>
                        </div>
                    </Link>
                    {/* Navigation + Actions */}
                    <div className="flex items-center gap-3 ml-auto">
                        <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
                            {navItems.map((item) => (
                                <Link
                                    href={item.href}
                                    key={item.href}
                                    className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                    aria-label={item.label}
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                                </Link>
                            ))}
                        </nav>
                        <ThemeToggle />
                        <SignInButton />
                        {/* Menu button only visible on small screens */}
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        className="md:hidden"
                        >
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                        {isMenuOpen && (
                            <div className="absolute top-16 right-4 w-48 bg-background border border-primary/10 rounded-md shadow-lg flex flex-col md:hidden z-50">
                                {navItems.map((item) => (
                                    <Link
                                        href={item.href}
                                        key={item.href}
                                        className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors rounded-md"
                                        aria-label={item.label}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </header>
            
        </div>
    );
}

