'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2, CarFront, Search, Plus } from 'lucide-react'
import Link from 'next/link'
import AddVehicleModal from './add-vehicle-modal'

// Define the Vehicle type
type Vehicle = {
  id: number
  make: string
  model: string
  year: number
  licensePlate: string
  customerId: number
  customerName: string
}

// Sample data
const initialVehicles: Vehicle[] = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2018, licensePlate: 'ABC123', customerId: 1, customerName: 'John Doe' },
  { id: 2, make: 'Honda', model: 'Civic', year: 2020, licensePlate: 'XYZ789', customerId: 2, customerName: 'Jane Smith' },
  { id: 3, make: 'Ford', model: 'F-150', year: 2019, licensePlate: 'DEF456', customerId: 3, customerName: 'Bob Johnson' },
  // Add more sample vehicles as needed
]

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddVehicle = (newVehicle: Omit<Vehicle, 'id'>) => {
    const id = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1
    setVehicles([...vehicles, { ...newVehicle, id }])
    setIsAddModalOpen(false)
  }

  const handleDeleteVehicle = (id: number) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Management</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[300px]"
          />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Vehicle
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Make</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.make}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.licensePlate}</TableCell>
              <TableCell>{vehicle.customerName}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/vehicles/${vehicle.id}`}>
                      <CarFront className="mr-2 h-4 w-4" /> Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteVehicle(vehicle.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddVehicle}
      />
    </div>
  )
}