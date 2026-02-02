"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Leaf, LayoutDashboard, Gift, MapPin, Recycle } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Leaf },
  { name: "Rewards", href: "/rewards", icon: Gift },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="glass-card rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl border-white/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="bg-brand-green p-1.5 rounded-lg shadow-lg shadow-brand-green/20">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
              YUKTI
            </span>
          </div>
            <span className="text-[10px] uppercase tracking-widest text-brand-green font-bold mt-0.5 hidden sm:block">
              Smart Source Segregation & Optimized Ward Collection
            </span>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-semibold transition-all rounded-2xl flex items-center gap-2 group",
                  isActive ? "text-brand-green" : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-brand-green/10 rounded-2xl border border-brand-green/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-brand-green")} />
                <span className="hidden xs:block">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
