"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import { authClient, useSession } from "@/lib/auth-client"
import Link from "next/link"

const navItems = [
  { name: "Browse Jobs", href: "#" },
  { name: "Company", href: "#" },
  { name: "Pricing", href: "#" },
]

export function Navbar() {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await authClient.signOut();
  }

  return (
    <nav className="fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2">
      <div className="flex h-[58px] items-center justify-between rounded-2xl border border-white/[0.04] bg-[#222222]/95 px-5 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="HireLoop Logo"
              width={130}
              height={40}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[13px] font-medium text-white/90 transition-colors duration-200 hover:text-[#7462FF]"
            >
              {item.name}
            </a>
          ))}

          {/* Divider */}
          <div className="h-5 w-px bg-white/15" />

          {session?.user ? (
            <>
              <span className="text-sm font-medium text-white/90">{session.user.name}</span>
              <Button
                  variant="brandAccent"
                  onClick={handleSignOut}
                  className="curosor pointer h-[42px] rounded-xl px-5 text-sm font-medium shadow-md shadow-[#6655FF]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6655FF]/30"
                >
                  Sign Out
                </Button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link
                href="/sign-in"
                className="text-sm font-medium text-[#7565FF] transition-colors hover:text-[#958AFF]"
              >
                Sign In
              </Link>

              {/* Get Started */}
              <Link href="/sign-up">
                <Button
                  variant="brandAccent"
                  className="cursor-pointer h-[42px] rounded-xl px-5 text-sm font-medium shadow-md shadow-[#6655FF]/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6655FF]/30"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Popover>
          <PopoverTrigger
            className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-white transition-all hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </PopoverTrigger>

          <PopoverContent
            align="end"
            sideOffset={12}
            className="w-64 rounded-2xl border border-white/10 bg-[#222222] p-3 text-white shadow-2xl shadow-black/30"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.name}
                </a>
              ))}

              <div className="my-1 h-px bg-white/10" />

              <Link
                href="/sign-in"
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#7565FF] transition-colors hover:bg-white/10"
              >
                Sign In
              </Link>

              <Link href="/sign-up">
                <Button
                  variant="brandAccent"
                  className="mt-2 h-11 w-full rounded-xl"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  )
}
