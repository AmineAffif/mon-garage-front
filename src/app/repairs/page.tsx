import RepairManagement from '@/components/repairs/repair-management'
import { Toaster } from "@/components/ui/toaster"

export default function RepairPage() {
  return (
    <main className="min-h-screen bg-background">
      <RepairManagement />
      <Toaster />
    </main>
  )
}