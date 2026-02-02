"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Clock, MapPin, CheckCircle2, AlertTriangle, Trophy, ArrowRight, ShieldCheck, Sparkles, Recycle, Zap, Navigation, ArrowUpRight } from "lucide-react"
import { toast } from "sonner"
import { useApp, WasteType, TimeSlot } from "@/lib/store"
import NumberFlow from "@number-flow/react"

export default function Home() {
  const { points, addRequest } = useApp()
  const [step, setStep] = useState<'landing' | 'pickup' | 'overflow' | 'success'>('landing')
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    wasteTypes: [] as WasteType[],
    timeSlot: "Morning" as TimeSlot
  })

  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.wasteTypes.length === 0) {
      toast.error("Please select at least one waste type", {
        description: "Source segregation is mandatory for smart collection.",
      })
      return
    }
    
    addRequest({
      ...formData,
      houseId: `H-${Math.floor(Math.random() * 900) + 100}`,
      lat: 26.1445 + (Math.random() - 0.5) * 0.05,
      lng: 91.7362 + (Math.random() - 0.5) * 0.05,
    })
    
    setStep('success')
  }

  const toggleWasteType = (type: WasteType) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(type)
        ? prev.wasteTypes.filter(t => t !== type)
        : [...prev.wasteTypes, type]
    }))
  }

  return (
    <div className="space-y-32 pb-20">
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center space-y-12 py-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-brand-green/10 text-brand-green font-black text-[10px] uppercase tracking-[0.2em] border border-brand-green/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
              </span>
              GMC × YUKTI: Smart Source Segregation & Optimized Ward Collection
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-[0.9] text-slate-900 dark:text-white">
                Clean City. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-teal to-blue-500">Smart Rewards.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
                The next-generation waste management platform for Guwahati. Schedule segregated pickups in 30 seconds and earn Green Points for every responsible action.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <Button 
                size="lg" 
                className="rounded-[2rem] px-12 h-20 text-xl font-black shadow-2xl shadow-brand-green/30 hover:scale-105 transition-all group bg-slate-900 text-white" 
                onClick={() => setStep('pickup')}
              >
                Schedule Pickup <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-[2rem] px-12 h-20 text-xl font-black bg-white/50 backdrop-blur-sm border-2 hover:bg-slate-50 transition-all border-slate-200" 
                onClick={() => setStep('overflow')}
              >
                Report Overflow
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
              {[
                { label: 'Green Points Earned', value: points, icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'Collections Today', value: 1284, icon: ShieldCheck, color: 'text-brand-teal', bg: 'bg-brand-teal/10' },
                { label: 'Active Smart Wards', value: 58, icon: MapPin, color: 'text-brand-green', bg: 'bg-brand-green/10' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card p-10 rounded-[3rem] text-center group border-none relative overflow-hidden shadow-xl bg-white/40"
                >
                  <div className={`absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-150 transition-transform duration-700`}>
                    <stat.icon className="w-32 h-32" />
                  </div>
                  <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-5xl font-black mb-2 tracking-tighter flex items-center justify-center gap-1">
                    <NumberFlow value={stat.value} />
                  </div>
                  <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {step === 'pickup' && (
          <motion.section 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-card p-12 md:p-16 rounded-[4rem] space-y-12 shadow-2xl border-none bg-white/60">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-4">
                  <div className="bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-green/20 w-fit">
                    Civic Service Portal
                  </div>
                  <h2 className="text-5xl font-black tracking-tight leading-[0.9]">Schedule <br /><span className="text-brand-green">Waste Pickup</span></h2>
                  <p className="text-slate-500 text-lg font-medium">Standardized collection for a sustainable Guwahati.</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl min-w-[200px] border border-brand-green/20">
                  <div className="bg-brand-green p-3 rounded-2xl shadow-xl shadow-brand-green/20">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-brand-green leading-none">+10</div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Green Points</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePickupSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Full Name</Label>
                    <Input 
                      placeholder="Arjun Das" 
                      className="h-16 rounded-2xl border-none bg-white shadow-inner px-6 font-bold focus:ring-4 focus:ring-brand-green/10 text-lg" 
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Phone Number</Label>
                    <Input 
                      placeholder="+91 98765 43210" 
                      className="h-16 rounded-2xl border-none bg-white shadow-inner px-6 font-bold focus:ring-4 focus:ring-brand-green/10 text-lg" 
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Pickup Location Details</Label>
                  <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-green" />
                    <Input 
                      placeholder="House No. 12, Bhetapara Main Rd, Ward 24" 
                      className="h-16 rounded-2xl border-none bg-white shadow-inner pl-16 pr-6 font-bold focus:ring-4 focus:ring-brand-green/10 text-lg" 
                      value={formData.address}
                      onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Waste Categorization</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(['Wet', 'Dry', 'E-Waste'] as WasteType[]).map((type) => {
                      const isSelected = formData.wasteTypes.includes(type)
                      return (
                        <div 
                          key={type} 
                          onClick={() => toggleWasteType(type)}
                          className={`flex items-center gap-4 p-6 rounded-3xl border-3 transition-all cursor-pointer group ${
                            isSelected 
                            ? 'bg-brand-green border-brand-green shadow-2xl shadow-brand-green/20 text-white' 
                            : 'bg-white border-slate-100 hover:border-brand-green/30'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'bg-white border-white' : 'border-slate-300'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-green" />}
                          </div>
                          <Label className={`font-black text-lg cursor-pointer transition-colors ${isSelected ? 'text-white' : 'group-hover:text-brand-green'}`}>{type}</Label>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Preferred Collection Slot</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['Morning', 'Afternoon', 'Evening'] as TimeSlot[]).map((slot) => {
                      const isSelected = formData.timeSlot === slot
                      return (
                        <Button 
                          key={slot} 
                          type="button" 
                          variant={isSelected ? "default" : "outline"}
                          className={`rounded-2xl h-16 font-black text-lg border-2 ${isSelected ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border-slate-100'}`}
                          onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                        >
                          {slot}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                  <Button type="submit" className="flex-1 h-20 rounded-[2rem] text-xl font-black bg-brand-green hover:bg-brand-green/90 shadow-2xl shadow-brand-green/30 active:scale-95 transition-all">
                    Confirm Pickup Schedule
                  </Button>
                  <Button type="button" variant="ghost" className="h-20 rounded-[2rem] px-12 font-black text-lg" onClick={() => setStep('landing')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </motion.section>
        )}

        {step === 'overflow' && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-card p-12 md:p-16 rounded-[4rem] space-y-12 border-none shadow-2xl bg-white/60">
              <div className="space-y-4">
                <div className="bg-amber-500/10 text-amber-600 p-4 rounded-3xl w-fit shadow-inner">
                  <AlertTriangle className="w-10 h-10" />
                </div>
                <h2 className="text-5xl font-black tracking-tight leading-[0.9]">Report Bin <br /><span className="text-amber-600">Overflow</span></h2>
                <p className="text-slate-500 text-lg font-medium">Rapid response system for civic maintenance.</p>
              </div>

              <form onSubmit={handlePickupSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Exact Location / Landmark</Label>
                  <Input 
                    placeholder="Near Ganeshguri Flyover, Opp. Petrol Pump" 
                    className="h-16 rounded-2xl border-none bg-white shadow-inner px-6 font-bold focus:ring-4 focus:ring-amber-500/10 text-lg" 
                    required 
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">Contextual Description</Label>
                  <textarea 
                    className="flex min-h-[200px] w-full rounded-[2rem] border-none bg-white shadow-inner px-6 py-5 text-lg font-bold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/10" 
                    placeholder="Describe the accumulation level and waste types..."
                  />
                </div>
                <div className="border-4 border-dashed border-slate-100 rounded-[3rem] p-16 text-center space-y-4 hover:border-amber-500/30 transition-all cursor-pointer group bg-slate-50/50">
                  <div className="bg-white p-6 rounded-3xl w-fit mx-auto shadow-xl group-hover:scale-110 transition-transform">
                    <Trash2 className="w-10 h-10 text-slate-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-slate-900">Upload Visual Evidence</div>
                    <div className="text-sm text-slate-500 font-medium">Helps our team prioritize immediate emergency response.</div>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                  <Button type="submit" className="flex-1 h-20 rounded-[2rem] text-xl font-black bg-amber-600 hover:bg-amber-700 shadow-2xl shadow-amber-600/30 active:scale-95 transition-all">
                    Initiate Urgent Cleanup
                  </Button>
                  <Button type="button" variant="ghost" className="h-20 rounded-[2rem] px-12 font-black text-lg" onClick={() => setStep('landing')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </motion.section>
        )}

        {step === 'success' && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center space-y-10 py-20"
          >
            <div className="relative w-48 h-48 mx-auto">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="bg-brand-green text-white p-12 rounded-full shadow-2xl shadow-brand-green/40 relative z-10"
              >
                <CheckCircle2 className="w-24 h-24" />
              </motion.div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-dashed border-brand-green/20 rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-amber-500 text-white p-4 rounded-3xl shadow-2xl"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-6xl font-black tracking-tight leading-none">Mission Scheduled!</h2>
              <p className="text-2xl text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Smart logistics active. A verified GMC collector will arrive during the <span className="text-brand-green font-black">{formData.timeSlot}</span> window.
              </p>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900 text-white p-10 rounded-[3rem] font-black text-3xl flex items-center justify-center gap-6 border-2 border-brand-green/20 shadow-2xl"
            >
              <div className="bg-brand-green p-4 rounded-3xl shadow-xl shadow-brand-green/20">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <span className="text-brand-green">+10</span> Green Points 🌱
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Transaction Verified</div>
              </div>
            </motion.div>

            <div className="pt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="rounded-3xl px-12 h-20 text-xl font-black shadow-2xl bg-brand-green hover:bg-brand-green/90" onClick={() => setStep('landing')}>
                Return to Hub
              </Button>
              <Button size="lg" variant="outline" className="rounded-3xl px-12 h-20 text-xl font-black border-2" onClick={() => window.location.href = '/rewards'}>
                Visit Wallet <ArrowUpRight className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Modern Proof Section */}
      <section className="pt-32 border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { label: 'Ward Households', val: '25K+', icon: MapPin },
            { label: 'Diverted from Landfill', val: '150T', icon: Recycle },
            { label: 'Active Collectors', val: '420+', icon: Truck },
            { label: 'System Uptime', val: '99.9%', icon: ShieldCheck },
          ].map((item, i) => (
            <motion.div 
              key={item.label} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center space-y-4 group"
            >
              <div className="text-6xl font-black text-brand-green tracking-tighter group-hover:scale-110 transition-transform duration-500">{item.val}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
