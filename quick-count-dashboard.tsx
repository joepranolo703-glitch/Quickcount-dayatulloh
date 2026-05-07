"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StatsCard } from "./stats-card"
import { ProgressBar } from "./progress-bar"
import { CounterCard } from "./counter-card"
import { TPSSelector } from "./tps-selector"
import { RecapTable } from "./recap-table"
import { TPSData, Rekap } from "@/lib/types"
import {
  Users,
  Vote,
  UserCheck,
  UserX,
  XCircle,
  BarChart3,
  Pencil,
  Activity,
  LogOut,
} from "lucide-react"

const STORAGE_KEY = "quickCountBaday"

const createInitialTPS = (): TPSData[] =>
  Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    dpt: 0,
    calon1: 0,
    calon2: 0,
    tidakSah: 0,
  }))

interface QuickCountDashboardProps {
  onLogout: () => void
}

export function QuickCountDashboard({ onLogout }: QuickCountDashboardProps) {
  const [tpsData, setTpsData] = useState<TPSData[]>(createInitialTPS)
  const [selectedTPS, setSelectedTPS] = useState(1)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setTpsData(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse saved data", e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tpsData))
    }
  }, [tpsData, isHydrated])

  const updateTPS = (id: number, field: keyof TPSData, value: number) => {
    setTpsData((prev) =>
      prev.map((tps) =>
        tps.id === id ? { ...tps, [field]: Math.max(0, value) } : tps
      )
    )
  }

  const increment = (id: number, field: keyof TPSData) => {
    setTpsData((prev) =>
      prev.map((tps) =>
        tps.id === id ? { ...tps, [field]: (tps[field] as number) + 1 } : tps
      )
    )
  }

  const decrement = (id: number, field: keyof TPSData) => {
    setTpsData((prev) =>
      prev.map((tps) =>
        tps.id === id
          ? { ...tps, [field]: Math.max(0, (tps[field] as number) - 1) }
          : tps
      )
    )
  }

  const rekap: Rekap = useMemo(() => {
    const totalDPT = tpsData.reduce((a, b) => a + b.dpt, 0)
    const totalCalon1 = tpsData.reduce((a, b) => a + b.calon1, 0)
    const totalCalon2 = tpsData.reduce((a, b) => a + b.calon2, 0)
    const totalTidakSah = tpsData.reduce((a, b) => a + b.tidakSah, 0)
    const totalMasuk = totalCalon1 + totalCalon2 + totalTidakSah

    return { totalDPT, totalCalon1, totalCalon2, totalTidakSah, totalMasuk }
  }, [tpsData])

  const persen1 = rekap.totalMasuk
    ? ((rekap.totalCalon1 / rekap.totalMasuk) * 100).toFixed(1)
    : "0"

  const persen2 = rekap.totalMasuk
    ? ((rekap.totalCalon2 / rekap.totalMasuk) * 100).toFixed(1)
    : "0"

  const persenMasuk = rekap.totalDPT
    ? ((rekap.totalMasuk / rekap.totalDPT) * 100).toFixed(1)
    : "0"

  const currentTPS = tpsData.find((t) => t.id === selectedTPS) || tpsData[0]

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Memuat data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Vote className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Quick Count</h1>
                <p className="text-xs text-muted-foreground">
                  Pemilihan Kepala Desa Buni Bakti 2026
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-accent">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Live</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="border-border text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="border-border bg-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground">
                  Calon Kepala Desa Buni Bakti
                </h2>
                <p className="text-primary font-semibold text-lg">
                  Bapak Dayatulloh
                </p>
                <p className="text-sm text-muted-foreground">
                  Status Quick Count Realtime • Update otomatis dari TPS 1 - TPS 17
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-secondary rounded-xl min-w-[140px]">
                <span className="text-sm text-muted-foreground mb-1">Data Masuk</span>
                <span className="text-4xl font-bold text-primary">{persenMasuk}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatsCard title="DPT" value={rekap.totalDPT} icon={Users} />
          <StatsCard
            title="Dayatulloh"
            value={rekap.totalCalon1}
            icon={UserCheck}
            variant="primary"
          />
          <StatsCard
            title="Sidi Sumardi"
            value={rekap.totalCalon2}
            icon={UserX}
            variant="destructive"
          />
          <StatsCard
            title="Tidak Sah"
            value={rekap.totalTidakSah}
            icon={XCircle}
          />
          <StatsCard
            title="Total Masuk"
            value={rekap.totalMasuk}
            icon={Vote}
            variant="accent"
          />
        </div>

        {/* Progress Bars */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BarChart3 className="w-5 h-5 text-primary" />
              Grafik Persentase Quick Count
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar
              label="Dayatulloh"
              percentage={parseFloat(persen1)}
              variant="primary"
            />
            <ProgressBar
              label="Sidi Sumardi"
              percentage={parseFloat(persen2)}
              variant="destructive"
            />
          </CardContent>
        </Card>

        {/* TPS Selector */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground">Menu TPS</CardTitle>
            <CardDescription>
              Pilih TPS untuk input data. TPS dengan data ditandai hijau.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TPSSelector
              tpsData={tpsData}
              selectedTPS={selectedTPS}
              onSelect={setSelectedTPS}
            />
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Pencil className="w-5 h-5 text-primary" />
              Input Data TPS {currentTPS.id}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Jumlah DPT (Daftar Pemilih Tetap)
              </label>
              <Input
                type="number"
                min={0}
                value={currentTPS.dpt || ""}
                onChange={(e) =>
                  updateTPS(currentTPS.id, "dpt", parseInt(e.target.value) || 0)
                }
                placeholder="Masukkan jumlah DPT"
                className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <CounterCard
                title="Suara Dayatulloh"
                value={currentTPS.calon1}
                onIncrement={() => increment(currentTPS.id, "calon1")}
                onDecrement={() => decrement(currentTPS.id, "calon1")}
                variant="primary"
              />
              <CounterCard
                title="Suara Sidi Sumardi"
                value={currentTPS.calon2}
                onIncrement={() => increment(currentTPS.id, "calon2")}
                onDecrement={() => decrement(currentTPS.id, "calon2")}
                variant="destructive"
              />
              <CounterCard
                title="Suara Tidak Sah"
                value={currentTPS.tidakSah}
                onIncrement={() => increment(currentTPS.id, "tidakSah")}
                onDecrement={() => decrement(currentTPS.id, "tidakSah")}
                variant="muted"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recap Table */}
        <RecapTable tpsData={tpsData} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-8">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Quick Count Pemilihan Kepala Desa Buni Bakti 2026 • Tim Pemenangan Dayatulloh
          </p>
        </div>
      </footer>
    </div>
  )
}
