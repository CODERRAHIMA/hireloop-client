"use client"

import React, { FormEvent, useState } from "react"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
  UsersRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from 'next/navigation'

interface SignUpFormData {
  name: string
  email: string
  password: string
  role: "seeker" | "recruiter" | "admin"
}

const roles = [
  { value: "seeker", label: "Job seeker", icon: UsersRound },
  { value: "recruiter", label: "Recruiter", icon: User },
  { value: "admin", label: "Admin", icon: Shield },
] as const

export default function SignUpPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSubmit = { ...formData }

      const { data, error } = await authClient.signUp.email({
        name: formDataToSubmit.name,
        email: formDataToSubmit.email,
        password: formDataToSubmit.password,
        role: formDataToSubmit.role,
      })

      if (error) {
        console.error("Sign-up error:", error.message)
        return
      }
      
      console.log("Sign-up successful:", data)
      router.push("/")
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
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#a99fff] uppercase">
            Join HireLoop
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Create an account
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-white/70">
              Joining HireLoop as
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {roles.map(({ value, label, icon: Icon }) => (
                <label key={value} className="cursor-pointer">
                  <input
                    className="peer sr-only"
                    type="radio"
                    name="role"
                    value={value}
                    checked={formData.role === value}
                    onChange={() =>
                      setFormData((previous) => ({ ...previous, role: value }))
                    }
                  />
                  <span className="flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-3 text-center transition-colors peer-checked:border-[#8174ff] peer-checked:bg-[#7462ff]/15 peer-focus-visible:ring-2 peer-focus-visible:ring-[#7462ff]/60">
                    <Icon className="size-6 text-[#a99fff]" aria-hidden="true" />
                    <span className="text-xs font-semibold text-white/85">
                      {label}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/35" />
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="h-12 rounded-xl border-white/10 bg-white/[0.04] pl-11 text-sm text-white shadow-none placeholder:text-white/35 focus-visible:border-[#8174ff]/70 focus-visible:ring-2 focus-visible:ring-[#7462ff]/20"
            />
          </div>

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
              autoComplete="new-password"
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

          <Button
            type="submit"
            className="mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-[#6252f5] to-[#7965ff] text-sm font-semibold text-white shadow-[0_8px_28px_rgba(102,83,255,0.28)] transition hover:brightness-110"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-white/45">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-[#a99fff] transition-colors hover:text-white"
          >
            Sign in
          </Link>
        </p>
      </section>
    </div>
  )
}
