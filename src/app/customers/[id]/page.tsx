'use client'

import { useParams } from 'next/navigation'
import CustomerDetails from '@/components/customers/customer-details'

export default function CustomerDetailPage() {
  const { id } = useParams() // Récupère l'ID de l'URL

  if (!id) {
    return <p>Loading...</p>
  }

  return (
    <main className="min-h-screen bg-background">
      <CustomerDetails customerId={id as string} />
    </main>
  )
}
