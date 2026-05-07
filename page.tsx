"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { QuickCountDashboard } from "@/components/quick-count-dashboard"

const AUTH_KEY = "quickCountAuth"

export default function QuickCountApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY)
    if (auth === "true") {
      setIsLoggedIn(true)
    }
    setIsHydrated(true)
  }, [])

  const handleLogin = () => {
    localStorage.setItem(AUTH_KEY, "true")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY)
    setIsLoggedIn(false)
  }

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Memuat...</div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <QuickCountDashboard onLogout={handleLogout} />
}
