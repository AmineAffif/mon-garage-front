'use client'

import { useParams } from 'next/navigation'
import RepairDetails from '@/components/repairs/repair-details'

export default function RepairDetailPage() {
  const { id } = useParams() // Récupère l'ID de l'URL

  if (!id) {
    return <p>Loading...</p>
  }

  return (
    <main className="min-h-screen bg-background">
      <RepairDetails repairId={id as string} />
    </main>
  )
}
