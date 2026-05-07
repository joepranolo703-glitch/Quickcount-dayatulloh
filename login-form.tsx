"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LockKeyhole, Vote } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = () => {
    if (password === "BADAY2026") {
      onLogin()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Vote className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            QUICK COUNT
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Pemenangan Dayatulloh
            <br />
            <span className="text-sm">Kepala Desa Buni Bakti 2026</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Masukkan Password Admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className={`pl-10 h-12 bg-input border-border text-foreground placeholder:text-muted-foreground ${
                  error ? "border-destructive animate-shake" : ""
                }`}
              />
            </div>
            {error && (
              <p className="text-destructive text-sm text-center">
                Password salah, coba lagi
              </p>
            )}
          </div>
          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            LOGIN ADMIN
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
