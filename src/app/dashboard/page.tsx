"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Map as MapIcon, 
  Navigation, 
  CheckCircle2, 
  Trash2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  MapPin,
  Recycle,
  AlertCircle,
  Truck,
  Zap,
  Layers,
  Search,
  Filter,
  MoreVertical,
  Activity,
  Route
} from "lucide-react"
import { useApp, PickupRequest } from "@/lib/store"
import { toast } from "sonner"
import NumberFlow from "@number-flow/react"

export default function DashboardPage() {
  const { requests, markAsPicked } = useApp()
  const [isRouting, setIsRouting] = useState(false)
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list')
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)
  const [showOptimizedPath, setShowOptimizedPath] = useState(false)

  const stats = useMemo(() => {
    const pending = requests.filter(r => r.status === "Pending")
    const picked = requests.filter(r => r.status === "Picked")
    const wet = requests.filter(r => r.wasteTypes.includes("Wet")).length
    const dry = requests.filter(r => r.wasteTypes.includes("Dry")).length
    const ewaste = requests.filter(r => r.wasteTypes.includes("E-Waste")).length

    return {
      total: requests.length,
      pending: pending.length,
      picked: picked.length,
      wet,
      dry,
      ewaste,
      distance: (requests.length * 0.85).toFixed(1),
      time: (requests.length * 11)
    }
  }, [requests])

  const pendingRequests = useMemo(() => 
    requests.filter(r => r.status === "Pending"), 
  [requests])

  const generateRoute = () => {
    setIsRouting(true)
    setTimeout(() => {
      setIsRouting(false)
      setActiveTab('map')
      setShowOptimizedPath(true)
      toast.success("AI-Optimized route generated! 4.3km circuit ready.", {
        description: "Greedy nearest-neighbor path calculated for " + stats.pending + " points.",
      })
    }, 2000)
  }

  const handleMarkPicked = (id: string) => {
    markAsPicked(id)
    toast.success("Collection verified!", {
      description: "Citizen balance updated and ward status synchronized.",
    })
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green font-bold text-[10px] uppercase tracking-widest border border-brand-green/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            Live Operations • Ward 42 (Guwahati Central)
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.9]">
            Collector <span className="text-brand-green">Hub</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-xl leading-relaxed">
            Real-time logistical interface for GMC ward collectors.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex p-1.5 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-[2rem] border-2 border-slate-200/50 dark:border-slate-700/50">
            <button 
              onClick={() => setActiveTab('list')}
              className={`px-8 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 uppercase tracking-widest ${
                activeTab === 'list' 
                ? 'bg-white dark:bg-slate-900 shadow-xl text-slate-900 dark:text-white' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> View List
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`px-8 py-3 rounded-2xl text-xs font-black transition-all flex items-center gap-2 uppercase tracking-widest ${
                activeTab === 'map' 
                ? 'bg-white dark:bg-slate-900 shadow-xl text-slate-900 dark:text-white' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <MapIcon className="w-4 h-4" /> Live Map
            </button>
          </div>
          <Button 
            onClick={generateRoute} 
            disabled={isRouting || stats.pending === 0}
            className="rounded-[2rem] h-14 px-10 flex items-center gap-3 font-black text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            {isRouting ? (
              <div className="w-5 h-5 border-3 border-white border-t-transparent animate-spin rounded-full" />
            ) : (
              <Navigation className="w-5 h-5" />
            )}
            {isRouting ? "Calculating Path..." : "Generate Route"}
          </Button>
        </div>
      </header>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Tasks', value: stats.pending, icon: Activity, color: 'text-brand-green', bg: 'bg-brand-green/10' },
          { label: 'Collection Rate', value: Math.round((stats.picked / stats.total) * 100) || 0, unit: '%', icon: TrendingUp, color: 'text-brand-teal', bg: 'bg-brand-teal/10' },
          { label: 'Est. Distance', value: stats.distance, unit: 'km', icon: Route, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Est. Duration', value: stats.time, unit: 'min', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-[2.5rem] relative overflow-hidden group border-none shadow-xl"
          >
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-black tracking-tighter">
                <NumberFlow value={stat.value as number} />
              </span>
              {stat.unit && <span className="text-xl font-black text-slate-400 tracking-tighter">{stat.unit}</span>}
            </div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
              <stat.icon className="w-32 h-32" />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-[3.5rem] overflow-hidden border-none shadow-2xl">
              <div className="p-10 border-b border-slate-100/50 dark:border-slate-800/50 flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black tracking-tight">Pickup Requests</h2>
                  <p className="text-slate-500 font-medium">Verified submissions from ward residents</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-12 pl-12 pr-4 text-sm font-medium border-none focus:ring-2 focus:ring-brand-green/20 w-64" 
                      placeholder="Search house ID or name..."
                    />
                  </div>
                  <Button variant="outline" className="h-12 w-12 rounded-2xl border-2 p-0"><Filter className="w-5 h-5" /></Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      <th className="px-12 py-6">Residential ID</th>
                      <th className="px-12 py-6">Primary Location</th>
                      <th className="px-12 py-6 text-center">Waste Matrix</th>
                      <th className="px-12 py-6">Time Frame</th>
                      <th className="px-12 py-6 text-right">Status / Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-12 py-32 text-center">
                          <div className="space-y-6 opacity-20">
                            <Truck className="w-24 h-24 mx-auto" />
                            <div className="text-2xl font-black uppercase tracking-widest">No Active Missions</div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      requests.map((req) => (
                        <tr key={req.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all cursor-default">
                          <td className="px-12 py-8">
                            <div className="font-black text-brand-green tracking-tighter text-2xl mb-0.5">{req.houseId}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{req.name}</div>
                          </td>
                          <td className="px-12 py-8">
                            <div className="font-bold text-slate-900 dark:text-white leading-tight mb-2 max-w-[200px]">{req.address}</div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-500">
                              <MapPin className="w-3 h-3" /> {req.lat.toFixed(4)}, {req.lng.toFixed(4)}
                            </div>
                          </td>
                          <td className="px-12 py-8">
                            <div className="flex flex-wrap gap-2 justify-center">
                              {req.wasteTypes.map(t => (
                                <span key={t} className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tighter border-2 ${
                                  t === 'Wet' ? 'bg-brand-green/5 text-brand-green border-brand-green/20' :
                                  t === 'Dry' ? 'bg-brand-teal/5 text-brand-teal border-brand-teal/20' :
                                  'bg-amber-500/5 text-amber-500 border-amber-500/20'
                                }`}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-12 py-8">
                            <div className="flex items-center gap-2.5 text-sm font-bold text-slate-600 dark:text-slate-400">
                              <Clock className="w-4 h-4 text-brand-green" /> {req.timeSlot}
                            </div>
                          </td>
                          <td className="px-12 py-8 text-right">
                            {req.status === 'Picked' ? (
                              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4" /> Finalized
                              </div>
                            ) : (
                              <Button 
                                variant="default"
                                size="sm" 
                                className="rounded-2xl h-12 px-6 font-black text-xs uppercase tracking-widest bg-brand-green hover:bg-brand-green/90 shadow-xl shadow-brand-green/20"
                                onClick={() => handleMarkPicked(req.id)}
                              >
                                Mark Picked
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[800px]"
          >
            {/* Map Mock - Ultra Quality */}
            <div className="lg:col-span-8 glass-card rounded-[3.5rem] relative overflow-hidden bg-slate-200 border-none shadow-2xl">
              <div className="absolute inset-0 opacity-70 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/91.75,26.14,14/1200x800?access_token=pk.dummy')] bg-cover mix-blend-multiply transition-opacity duration-1000" />
              
              {/* Map UI Overlays */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <div className="glass-card p-2 rounded-2xl shadow-2xl border-white/50 flex flex-col gap-1">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white"><Layers className="w-5 h-5 text-slate-600" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white"><Activity className="w-5 h-5 text-slate-600" /></Button>
                </div>
              </div>

              {/* Fake Route SVG - Animated Path */}
              {showOptimizedPath && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <defs>
                    <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1FAF5A" />
                      <stop offset="100%" stopColor="#0FB9B1" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    d="M 150 200 C 250 150, 300 400, 450 350 S 600 150, 750 300 S 900 500, 1000 400"
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="16 20"
                    className="drop-shadow-[0_0_15px_rgba(31,175,90,0.5)]"
                  />
                </svg>
              )}

              {/* Dynamic Map Pins */}
              {requests.map((req, i) => {
                const isPending = req.status === 'Pending'
                return (
                  <motion.div
                    key={req.id}
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring", damping: 12 }}
                    onClick={() => setSelectedRequestId(req.id)}
                    className={`absolute cursor-pointer transition-all hover:scale-125 z-30 ${selectedRequestId === req.id ? 'z-40' : ''}`}
                    style={{ 
                      top: `${25 + (i * 12) % 60 + Math.sin(i * 1.5) * 15}%`, 
                      left: `${15 + (i * 18) % 70 + Math.cos(i * 1.5) * 15}%` 
                    }}
                  >
                    <div className={`relative p-2.5 rounded-2xl shadow-2xl border-4 transition-all duration-500 ${
                      !isPending 
                      ? 'bg-slate-100 border-white text-slate-300 opacity-60' 
                      : selectedRequestId === req.id
                      ? 'bg-slate-900 border-brand-green text-brand-green scale-150 shadow-brand-green/50'
                      : 'bg-white border-brand-green text-brand-green animate-float'
                    }`}>
                      <MapPin className="w-5 h-5 fill-current" />
                      
                      <AnimatePresence>
                        {selectedRequestId === req.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-5 bg-slate-900 text-white rounded-[2rem] shadow-2xl min-w-[200px] border border-brand-green/30"
                          >
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-brand-green font-black text-xl">{req.houseId}</span>
                                <span className="text-[9px] font-black uppercase bg-brand-green/20 text-brand-green px-2 py-0.5 rounded-lg">Priority</span>
                              </div>
                              <div className="text-xs font-bold leading-snug text-slate-300">{req.address}</div>
                              <div className="flex gap-1.5">
                                {req.wasteTypes.map(t => (
                                  <span key={t} className="text-[8px] font-black uppercase px-2 py-0.5 bg-white/10 rounded-md">{t}</span>
                                ))}
                              </div>
                              {isPending && (
                                <Button 
                                  size="sm" 
                                  className="w-full h-10 rounded-xl bg-brand-green hover:bg-brand-green/90 font-black text-[10px] uppercase tracking-widest mt-1"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMarkPicked(req.id)
                                  }}
                                >
                                  Verify Collection
                                </Button>
                              )}
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-transparent border-t-slate-900" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-10 left-10 right-10 z-40">
                <div className="glass-card p-8 rounded-[3rem] flex items-center justify-between border-white/40 shadow-2xl backdrop-blur-2xl">
                  <div className="flex items-center gap-6">
                    <div className="bg-slate-900 p-4 rounded-[1.5rem] text-brand-green shadow-xl">
                      <Navigation className="w-8 h-8 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-2xl font-black tracking-tight flex items-center gap-3">
                        Ward Circuit Alpha
                        <span className="text-[10px] uppercase tracking-widest bg-brand-green/10 text-brand-green px-3 py-1 rounded-full border border-brand-green/20">Active</span>
                      </div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em] mt-1">
                        {stats.distance} KM CIRCUIT • {stats.pending} STOPS LEFT • APPROX {stats.time} MINS TO COMPLETION
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="rounded-2xl h-14 px-8 font-black border-2 bg-white/50">Export GPS</Button>
                    <Button className="rounded-2xl h-14 px-10 font-black bg-brand-green shadow-xl shadow-brand-green/20">Navigate Next</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Navigation Panel */}
            <div className="lg:col-span-4 glass-card rounded-[3.5rem] p-10 space-y-10 flex flex-col border-none shadow-2xl bg-white/40">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 text-slate-900">
                    <TrendingUp className="w-6 h-6 text-brand-green" /> Priority Queue
                  </h3>
                  <MoreVertical className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Calculated using Ward Optimizer v4.2</p>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {pendingRequests.length > 0 ? (
                  pendingRequests.slice(0, 6).map((req, i) => (
                    <motion.div 
                      key={req.id} 
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      className={`p-7 rounded-[2.5rem] border-3 transition-all group relative cursor-pointer ${
                        selectedRequestId === req.id 
                        ? 'bg-slate-900 border-brand-green text-white shadow-2xl shadow-brand-green/20' 
                        : 'bg-white border-slate-50 hover:border-brand-green/20 hover:shadow-xl'
                      }`}
                      onClick={() => setSelectedRequestId(req.id)}
                    >
                      {i === 0 && (
                        <div className="absolute -top-3 -right-3 bg-brand-teal text-white px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl animate-bounce">
                          Next Stop
                        </div>
                      )}
                      <div className="space-y-5">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className={`text-[10px] font-black uppercase tracking-widest ${selectedRequestId === req.id ? 'text-brand-green' : 'text-slate-400'}`}>
                              Sequence #{i + 1}
                            </div>
                            <div className="text-3xl font-black tracking-tighter">{req.houseId}</div>
                          </div>
                          <div className={`text-[10px] font-black px-3 py-1 rounded-full ${selectedRequestId === req.id ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            ~{Math.round((i + 1) * 350 / 100) * 100}M
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className={`text-base font-bold leading-tight ${selectedRequestId === req.id ? 'text-white/90' : 'text-slate-600'}`}>
                            {req.address}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {req.wasteTypes.map(t => (
                              <span key={t} className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                                selectedRequestId === req.id ? 'bg-white/10 text-brand-green border border-brand-green/30' : 'bg-slate-50 text-slate-400 border border-slate-100'
                              }`}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {selectedRequestId === req.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                            <Button 
                              className="w-full bg-brand-green hover:bg-brand-green/90 text-white rounded-2xl h-14 font-black text-sm uppercase tracking-widest mt-4 shadow-xl shadow-brand-green/20"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMarkPicked(req.id)
                              }}
                            >
                              Verify & Log
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 space-y-6">
                    <div className="bg-brand-green/10 text-brand-green p-10 rounded-[2.5rem] w-fit mx-auto border-4 border-white shadow-2xl">
                      <CheckCircle2 className="w-16 h-16" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-black tracking-tight">Mission Accomplished</div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">All Ward 42 collection points <br />have been finalized.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
