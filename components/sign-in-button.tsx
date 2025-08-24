'use client';
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

interface SignInButtonProps {
    className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
    return (
        <Link href="/login" className={className}>
            <Button className="bg-primary text-white hover:bg-primary/80 transition-colors flex items-center gap-2 px-4 py-2 rounded-md">
                <LogIn className="h-4 w-4 text-white dark:text-black" />
                <span className="text-white dark:text-black">Sign In</span>
            </Button>
        </Link>
    );
}