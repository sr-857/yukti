"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trophy, Gift, ArrowRight, Wallet, Sparkles, CreditCard, History, Zap, CheckCircle2, QrCode, Tag, Percent } from "lucide-react"
import { useApp } from "@/lib/store"
import { toast } from "sonner"
import NumberFlow from "@number-flow/react"

const REWARDS = [
  {
    id: 1,
    title: "10% Grocery Discount",
    merchant: "Reliance Fresh / Big Bazaar",
    points: 20,
    icon: <Percent className="w-8 h-8" />,
    color: "from-blue-500 to-indigo-600",
    tag: "Groceries"
  },
  {
    id: 2,
    title: "Free Compost Bag",
    merchant: "GMC Organic Initiative",
    points: 50,
    icon: <Tag className="w-8 h-8" />,
    color: "from-brand-green to-emerald-700",
    tag: "Eco-Friendly"
  },
  {
    id: 3,
    title: "Municipal Tax Rebate",
    merchant: "Guwahati Municipal Corp",
    points: 100,
    icon: <Trophy className="w-8 h-8" />,
    color: "from-amber-500 to-orange-600",
    tag: "Tax Benefit"
  },
]

export default function RewardsPage() {
  const { points } = useApp()

  const handleRedeem = (reward: typeof REWARDS[0]) => {
    if (points < reward.points) {
      toast.error(`You need ${reward.points - points} more points to redeem this!`)
      return
    }
    toast.success(`Successfully redeemed ${reward.title}! Check your email for the coupon code.`)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-[10px] uppercase tracking-widest border border-brand-green/20">
            <Sparkles className="w-3 h-3" /> Citizen Appreciation Program
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white">
            Green <span className="text-brand-green">Wallet</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-xl leading-relaxed">
            Your contribution to Guwahati's cleanliness translates to tangible rewards.
          </p>
        </div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden p-1 rounded-[3rem] bg-gradient-to-br from-brand-green via-brand-teal to-blue-500 shadow-2xl"
        >
          <div className="bg-white dark:bg-slate-900 px-10 py-8 rounded-[2.8rem] flex flex-col items-center gap-2 relative z-10 min-w-[300px]">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <Wallet className="w-32 h-32" />
            </div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
              <Zap className="w-3 h-3 text-brand-green fill-brand-green" /> Current Balance
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                <NumberFlow value={points} />
              </span>
              <span className="text-2xl font-black text-brand-green tracking-tighter">GP</span>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-brand-green/20">
                Eco Warrior Status
              </div>
            </div>
          </div>
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-teal/20 blur-3xl -z-10 animate-pulse" />
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <Gift className="w-8 h-8 text-brand-green" /> Available Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {REWARDS.map((reward, i) => {
              const canAfford = points >= reward.points
              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className={`glass-card group relative p-1 rounded-[2.5rem] overflow-hidden transition-all border-none ${
                    !canAfford && 'opacity-70 grayscale-[0.3]'
                  }`}
                >
                  <div className="bg-white dark:bg-slate-900/90 flex flex-col md:flex-row rounded-[2.4rem] overflow-hidden border border-slate-100 dark:border-slate-800">
                    <div className={`md:w-48 bg-gradient-to-br ${reward.color} p-8 flex flex-col items-center justify-center text-white relative`}>
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] " />
                      <div className="relative z-10 bg-white/20 p-4 rounded-3xl backdrop-blur-sm mb-4">
                        {reward.icon}
                      </div>
                      <div className="text-3xl font-black tracking-tighter relative z-10">{reward.points}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-80 relative z-10">Points</div>
                    </div>
                    
                    <div className="flex-1 p-8 flex flex-col justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {reward.tag}
                          </span>
                          {!canAfford && (
                            <span className="text-[10px] font-black text-amber-500 uppercase flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Needs {reward.points - points} more GP
                            </span>
                          )}
                        </div>
                        <h3 className="font-black text-2xl leading-tight tracking-tight text-slate-900 dark:text-white">
                          {reward.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium">Partner: {reward.merchant}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Button 
                          onClick={() => handleRedeem(reward)}
                          disabled={!canAfford}
                          className={`flex-1 h-14 rounded-2xl font-black text-lg transition-all ${
                            canAfford 
                            ? 'bg-brand-green hover:bg-brand-green/90 shadow-xl shadow-brand-green/20' 
                            : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                          }`}
                        >
                          {canAfford ? 'Redeem Voucher' : 'Insufficient Balance'}
                        </Button>
                        <Button variant="outline" className="h-14 w-14 rounded-2xl border-2 flex items-center justify-center">
                          <QrCode className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Decorative circle for ticket look */}
                  <div className="absolute top-1/2 left-48 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 hidden md:block border-r border-slate-100 dark:border-slate-800" />
                  <div className="absolute top-1/2 left-48 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-950 hidden md:block border-l border-slate-100 dark:border-slate-800" />
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <History className="w-6 h-6 text-brand-green" /> Recent Earnings
            </h2>
            
            <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
              {[
                { title: 'Waste Pickup Confirmed', type: 'Credit', val: '+10', time: '2 hours ago', icon: Zap, color: 'text-brand-green' },
                { title: 'Daily Login Bonus', type: 'Credit', val: '+2', time: '5 hours ago', icon: Sparkles, color: 'text-brand-teal' },
                { title: 'Community Contribution', type: 'Credit', val: '+5', time: 'Yesterday', icon: CheckCircle2, color: 'text-blue-500' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between gap-4 group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 transition-colors group-hover:bg-brand-green/5`}>
                      <activity.icon className={`w-6 h-6 ${activity.color}`} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{activity.title}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{activity.time}</div>
                    </div>
                  </div>
                  <div className={`font-black text-lg ${activity.color}`}>{activity.val}</div>
                </div>
              ))}
              <Button variant="ghost" className="w-full rounded-2xl h-12 font-bold text-brand-green text-sm">
                Full History
              </Button>
            </div>
          </section>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-card p-10 rounded-[3rem] bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-40 h-40" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="bg-brand-green p-4 rounded-3xl w-fit shadow-xl shadow-brand-green/20">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black tracking-tight leading-tight">Refer & <br />Multiply</h3>
                <p className="text-slate-400 font-medium text-sm">Help your community stay clean and earn 100 GP for every successful referral.</p>
              </div>
              <Button className="w-full h-14 bg-brand-green hover:bg-brand-green/90 text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-green/20">
                Share Referral Link
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
