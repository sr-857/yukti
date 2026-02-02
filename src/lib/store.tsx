"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type WasteType = "Wet" | "Dry" | "E-Waste"
export type PickupStatus = "Pending" | "Picked"
export type TimeSlot = "Morning" | "Afternoon" | "Evening"

export interface PickupRequest {
  id: string
  houseId: string
  name: string
  phone: string
  address: string
  wasteTypes: WasteType[]
  timeSlot: TimeSlot
  status: PickupStatus
  lat: number
  lng: number
  createdAt: string
}

interface AppState {
  points: number
  requests: PickupRequest[]
  addRequest: (request: Omit<PickupRequest, "id" | "status" | "createdAt">) => void
  markAsPicked: (id: string) => void
  addPoints: (amount: number) => void
}

const AppContext = createContext<AppState | undefined>(undefined)

const MOCK_HOUSES = Array.from({ length: 50 }, (_, i) => ({
  id: `H-${100 + i}`,
  lat: 26.1445 + (Math.random() - 0.5) * 0.05,
  lng: 91.7362 + (Math.random() - 0.5) * 0.05,
}))

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(60)
  const [requests, setRequests] = useState<PickupRequest[]>([
    {
      id: "req-1",
      houseId: "H-101",
      name: "Rupam Kalita",
      phone: "+91 98640 12345",
      address: "Bhetapara Main Road, Ward 24",
      wasteTypes: ["Wet", "Dry"],
      timeSlot: "Morning",
      status: "Pending",
      lat: 26.1345,
      lng: 91.7562,
      createdAt: new Date().toISOString(),
    },
    {
      id: "req-2",
      houseId: "H-105",
      name: "Sunita Devi",
      phone: "+91 98640 54321",
      address: "Hatigaon Chariali, House 45",
      wasteTypes: ["Dry", "E-Waste"],
      timeSlot: "Afternoon",
      status: "Pending",
      lat: 26.1245,
      lng: 91.7762,
      createdAt: new Date().toISOString(),
    },
    {
      id: "req-3",
      houseId: "H-110",
      name: "Nitumoni Borah",
      phone: "+91 98640 67890",
      address: "Dispur Last Gate, Flat 2B",
      wasteTypes: ["Wet"],
      timeSlot: "Morning",
      status: "Pending",
      lat: 26.1545,
      lng: 91.7662,
      createdAt: new Date().toISOString(),
    }
  ])

  // Load from localStorage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem("yukti_points")
    const savedRequests = localStorage.getItem("yukti_requests")
    if (savedPoints) setPoints(parseInt(savedPoints))
    if (savedRequests) setRequests(JSON.parse(savedRequests))
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("yukti_points", points.toString())
    localStorage.setItem("yukti_requests", JSON.stringify(requests))
  }, [points, requests])

  const addRequest = (req: Omit<PickupRequest, "id" | "status" | "createdAt">) => {
    const newRequest: PickupRequest = {
      ...req,
      id: `req-${Math.random().toString(36).substr(2, 9)}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    }
    setRequests(prev => [newRequest, ...prev])
  }

  const markAsPicked = (id: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id && req.status === "Pending") {
        setPoints(p => p + 10)
        return { ...req, status: "Picked" }
      }
      return req
    }))
  }

  const addPoints = (amount: number) => setPoints(p => p + amount)

  return (
    <AppContext.Provider value={{ points, requests, addRequest, markAsPicked, addPoints }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
