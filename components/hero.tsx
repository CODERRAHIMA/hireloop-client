"use client"

import Image from "next/image"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const trendingRoles = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[700px] w-full flex-col items-center overflow-hidden bg-[#030306] px-4 pt-28 pb-10 sm:min-h-[750px] sm:pt-38 lg:min-h-[950px]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[42%] left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#503BFF]/15 blur-[140px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute bottom-0 left-1/2 h-[250px] w-[80%] -translate-x-1/2 rounded-full bg-[#1748FF]/10 blur-[120px]" />
      </div>

      {/* Globe background */}
      <div className="pointer-events-none absolute bottom-[-130px] left-1/2 z-0 w-screen max-w-none -translate-x-1/2 sm:bottom-[-160px] sm:bottom-auto lg:top-[-350px]">
        <Image
          src="/images/globe.png"
          alt="Glowing digital earth"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="h-auto w-full object-contain drop-shadow-[0_-5px_45px_rgba(91,70,255,0.55)]"
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Jobs badge */}
        <div className="mb-5 flex w-full items-center justify-center">
          {/* Left glow line */}
          <div className="h-px max-w-[65px] flex-1 bg-gradient-to-r from-transparent to-white/40" />

          {/* Badge */}
          <div className="inline-flex shrink-0 items-center gap-2 font-space-mono rounded-full border border-white/10 bg-[#171719] px-4 py-2 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="text-sm">💼</span>

            <span className="text-sm font-bold text-white">50,000+</span>

            <span className="text-[13px] tracking-wide text-white/45">
              NEW JOBS THIS MONTH
            </span>
          </div>

          {/* Right glow line */}
          <div className="h-px max-w-[65px] flex-1 bg-gradient-to-l from-transparent to-white/40" />
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-manrope font-bold tracking-tight text-white sm:text-4xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-2xl text-xs font-manrope leading-relaxed text-white/55 sm:text-[15px]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-white/15 bg-[#111113]/90 p-1.5 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0">
          {/* Job search */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/70" />
            <Input
              type="text"
              placeholder="Job title, skill or company"
              className="h-10 border-0 bg-transparent pl-9 text-xs text-white shadow-none placeholder:text-white/60 focus-visible:ring-0"
            />
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-white/15 sm:block" />

          {/* Location search */}
          <div className="relative flex-1">
            <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/70" />
            <Input
              type="text"
              placeholder="Location or Remote"
              className="h-10 border-0 bg-transparent pl-9 text-xs text-white shadow-none placeholder:text-white/60 focus-visible:ring-0"
            />
          </div>

          {/* Search button */}
          <Button
            variant="brandAccent"
            className="h-10 shrink-0 rounded-lg px-2.5"
            aria-label="Search jobs"
          >
            <Search className="size-5" />
          </Button>
        </div>

        {/* Trending roles */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/60">Trending Position</span>

          {trendingRoles.map((role) => (
            <button
              key={role}
              type="button"
              className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/85 transition-colors hover:border-[#7565FF]/50 hover:bg-[#7565FF]/15 hover:text-white"
            >
              {role}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
