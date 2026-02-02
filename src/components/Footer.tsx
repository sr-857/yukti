"use client"

import { Recycle, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-brand-green p-1.5 rounded-lg">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-tighter">YUKTI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Smart Source Segregation & Optimized Ward Collection platform for Guwahati Municipal Corporation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-green">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@yukti.gov.in</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 1800-345-6789</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Panbazar, Guwahati, Assam</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-green">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-brand-green transition-colors">Waste Guidelines</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Schedule FAQ</a></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Rewards Program</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-brand-green">Initiative</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built for SDG-12 | Responsible Consumption and Production. Guwahati Smart Ward Prototype v1.0
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-muted-foreground font-medium">
          © {new Date().getFullYear()} Guwahati Municipal Corporation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
