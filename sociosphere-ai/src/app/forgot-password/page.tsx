// =============================================================
// FORGOT PASSWORD PAGE — Where users request a password reset.
//
// Features:
// - Email input field
// - Submit button
// - Success state after submission
// - Link back to login page
// =============================================================

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  // Track whether the reset email has been "sent"
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission (dummy)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to send a reset email
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      {/* ---- Decorative Background ---- */}
      <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <Card className="relative w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          {/* Logo */}
          <Link
            href="/"
            className="mx-auto mb-4 flex items-center gap-2 text-lg font-bold"
          >
            <Building2 className="h-6 w-6 text-primary" />
            SocioSphere <span className="text-primary">AI</span>
          </Link>

          {/* Show different content based on submission state */}
          {!isSubmitted ? (
            <>
              <CardTitle className="text-2xl">Forgot your password?</CardTitle>
              <CardDescription>
                Enter your email and we&apos;ll send you a reset link.
              </CardDescription>
            </>
          ) : (
            <>
              {/* Success Icon */}
              <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>
                We&apos;ve sent a password reset link to your email address.
              </CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent>
          {/* ---- Form (shown before submission) ---- */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Send Reset Link
              </Button>
            </form>
          ) : (
            /* ---- Success State (shown after submission) ---- */
            <div className="space-y-4">
              <p className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-primary hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </div>
          )}

          {/* ---- Back to Login Link ---- */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
