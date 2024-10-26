'use client'

import { useState, useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, FileText } from 'lucide-react'
import Link from 'next/link'

type Repair = {
  id: string
  vehicleInfo: string
  customerName: string
  description: string
  status: 'pending' | 'in progress' | 'completed'
  date: string
}

const statusColors = {
  pending: "bg-yellow-500",
  'in progress': "bg-blue-500",
  completed: "bg-green-500"
}

export default function RepairList() {
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [filteredRepairs, setFilteredRepairs] = useState<Repair[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchRepairs = async () => {
      setIsLoading(true)
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        const mockRepairs: Repair[] = [
          { id: '1', vehicleInfo: 'Toyota Camry 2018', customerName: 'John Doe', description: 'Oil change', status: 'completed', date: '2023-05-15' },
          { id: '2', vehicleInfo: 'Honda Civic 2020', customerName: 'Jane Smith', description: 'Brake pad replacement', status: 'in progress', date: '2023-05-20' },
          { id: '3', vehicleInfo: 'Ford F-150 2019', customerName: 'Bob Johnson', description: 'Engine diagnostic', status: 'pending', date: '2023-05-25' },
        ]
        setRepairs(mockRepairs)
        setFilteredRepairs(mockRepairs)
      } catch (error) {
        console.error('Error fetching repairs:', error)
        toast({
          title: "Error",
          description: "Failed to fetch repairs. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepairs()
  }, [toast])

  useEffect(() => {
    const filtered = repairs.filter(repair => 
      (repair.vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
       repair.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       repair.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || repair.status === statusFilter)
    )
    setFilteredRepairs(filtered)
  }, [searchTerm, statusFilter, repairs])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Repair List</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search repairs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full sm:w-[300px]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredRepairs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRepairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell>{repair.vehicleInfo}</TableCell>
                <TableCell>{repair.customerName}</TableCell>
                <TableCell>{repair.description}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[repair.status]} text-white`}>
                    {repair.status}
                  </Badge>
                </TableCell>
                <TableCell>{repair.date}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/repairs/${repair.id}`}>
                      <FileText className="mr-2 h-4 w-4" /> Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4">No repairs found</div>
      )}
    </div>
  )
}