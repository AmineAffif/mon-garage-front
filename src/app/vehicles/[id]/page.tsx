'use client'

import { useParams } from 'next/navigation'
import VehicleDetails from '@/components/vehicles/vehicle-details'

export default function VehicleDetailPage() {
  const { id } = useParams() // Récupère l'ID de l'URL

  if (!id) {
    return <p>Loading...</p>
  }

  return (
    <main className="min-h-screen bg-background">
      <VehicleDetails vehicleId={id as string} />
    </main>
  )
}
