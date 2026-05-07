"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TPSData } from "@/lib/types"
import { TableIcon } from "lucide-react"

interface RecapTableProps {
  tpsData: TPSData[]
}

export function RecapTable({ tpsData }: RecapTableProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TableIcon className="w-5 h-5 text-primary" />
          Rekap Seluruh TPS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">TPS</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">DPT</th>
                <th className="text-center py-3 px-2 text-primary font-medium">Dayatulloh</th>
                <th className="text-center py-3 px-2 text-destructive font-medium">Sidi Sumardi</th>
                <th className="text-center py-3 px-2 text-muted-foreground font-medium">Tidak Sah</th>
                <th className="text-center py-3 px-2 text-accent font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {tpsData.map((tps) => {
                const total = tps.calon1 + tps.calon2 + tps.tidakSah
                const hasData = total > 0

                return (
                  <tr
                    key={tps.id}
                    className={`border-b border-border/50 transition-colors ${
                      hasData ? "bg-accent/5" : "hover:bg-secondary/50"
                    }`}
                  >
                    <td className="py-3 px-2 font-medium text-foreground">
                      TPS {tps.id}
                    </td>
                    <td className="text-center py-3 px-2 text-muted-foreground">
                      {tps.dpt.toLocaleString("id-ID")}
                    </td>
                    <td className="text-center py-3 px-2 font-semibold text-primary">
                      {tps.calon1.toLocaleString("id-ID")}
                    </td>
                    <td className="text-center py-3 px-2 font-semibold text-destructive">
                      {tps.calon2.toLocaleString("id-ID")}
                    </td>
                    <td className="text-center py-3 px-2 text-muted-foreground">
                      {tps.tidakSah.toLocaleString("id-ID")}
                    </td>
                    <td className="text-center py-3 px-2 font-bold text-accent">
                      {total.toLocaleString("id-ID")}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
