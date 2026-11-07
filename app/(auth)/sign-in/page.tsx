"use client"

import React, { FormEvent, useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

interface SignInFormData {
  email: string
  password: string
}

export default function SignInPage() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSubmit = { ...formData }

      const { data, error } = await authClient.signIn.email({
        email: formDataToSubmit.email,
        password: formDataToSubmit.password,
        rememberMe: true,
        callbackURL: "/",
      })

      if (error) {
        console.error("Sign-in error:", error.message)
        return;
      }

      console.log("Sign-in successful:", data)
    } catch (error) {
      console.error("Something went wrong:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative isolate mt-8 flex min-h-[calc(100svh-78px)] items-center justify-center overflow-hidden bg-[#050509] px-4 py-10 text-white sm:px-6 lg:mt-18">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(81,67,255,0.18),transparent_55%)]"
      />

      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b11]/90 p-6 shadow-[0_24px_80px_-40px_rgba(74,61,255,0.55)] sm:p-8">
        <div className="mb-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#a99fff] uppercase">
            Welcome to HireLoop
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-white/50">Sign in to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="h-12 rounded-xl border-white/10 bg-white/[0.04] pl-11 text-sm text-white shadow-none placeholder:text-white/35 focus-visible:border-[#8174ff]/70 focus-visible:ring-2 focus-visible:ring-[#7462ff]/20"
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="h-12 rounded-xl border-white/10 bg-white/[0.04] pr-12 pl-11 text-sm text-white shadow-none placeholder:text-white/35 focus-visible:border-[#8174ff]/70 focus-visible:ring-2 focus-visible:ring-[#7462ff]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-white/45 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#7462ff]/60 focus-visible:outline-none"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2 px-1 pt-1">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#7565ff] focus-visible:ring-2 focus-visible:ring-[#7462ff]/50"
            />
            <label htmlFor="remember-me" className="text-sm text-white/55">
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            className="mt-2 h-12 w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#6252f5] to-[#7965ff] text-sm font-semibold text-white shadow-[0_8px_28px_rgba(102,83,255,0.28)] transition hover:brightness-110"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-white/45">
          {"Don't have an account?"}{" "}
          <Link
            href="/sign-up"
            className="font-medium text-[#a99fff] transition-colors hover:text-white"
          >
            Create an account
          </Link>
        </p>
      </section>
    </div>
  )
}
