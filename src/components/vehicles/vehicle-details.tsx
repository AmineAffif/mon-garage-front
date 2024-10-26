'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Car, Hammer, Calendar } from 'lucide-react'
import Link from 'next/link'

type Vehicle = {
  id: number
  make: string
  model: string
  year: number
  licensePlate: string
  vin: string
  customerId: number
  customerName: string
}

type MaintenanceRecord = {
  id: number
  date: string
  description: string
  cost: number
}

type ServiceReminder = {
  id: number
  dueDate: string
  description: string
}

// Props pour le composant
type VehicleDetailsProps = {
  vehicleId: string
}

export default function VehicleDetails({ vehicleId }: VehicleDetailsProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([])
  const [serviceReminders, setServiceReminders] = useState<ServiceReminder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      setIsLoading(true)
      try {
        // Simulating API calls
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        setVehicle({
          id: 1,
          make: 'Toyota',
          model: 'Camry',
          year: 2018,
          licensePlate: 'ABC123',
          vin: '1HGBH41JXMN109186',
          customerId: 1,
          customerName: 'John Doe'
        })
        setMaintenanceRecords([
          { id: 1, date: '2023-05-15', description: 'Oil change', cost: 50 },
          { id: 2, date: '2023-03-10', description: 'Brake pad replacement', cost: 200 },
        ])
        setServiceReminders([
          { id: 1, dueDate: '2023-11-15', description: 'Annual inspection' },
          { id: 2, dueDate: '2024-01-10', description: 'Tire rotation' },
        ])
      } catch (error) {
        console.error('Error fetching vehicle details:', error)
        toast({
          title: "Error",
          description: "Failed to fetch vehicle details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (vehicleId) {
      fetchVehicleDetails()
    }
  }, [vehicleId, toast])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!vehicle) {
    return <div className="text-center py-4">Vehicle not found</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vehicle Details</h1>
        <Button variant="outline" asChild>
          <Link href="/vehicles">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vehicles
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Make:</strong> {vehicle.make}</p>
              <p><strong>Model:</strong> {vehicle.model}</p>
              <p><strong>Year:</strong> {vehicle.year}</p>
            </div>
            <div className="space-y-2">
              <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
              <p><strong>VIN:</strong> {vehicle.vin}</p>
              <p><strong>Owner:</strong> {vehicle.customerName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.description}</TableCell>
                  <TableCell>${record.cost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Service Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{reminder.description}</span>
                </div>
                <Badge variant="outline">{reminder.dueDate}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <Car className="mr-2 h-4 w-4" /> Update Vehicle Info
        </Button>
        <Button>
          <Hammer className="mr-2 h-4 w-4" /> Schedule Service
        </Button>
      </div>
    </div>
  )
}