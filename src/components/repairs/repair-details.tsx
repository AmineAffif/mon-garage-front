'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Upload, Send } from 'lucide-react'
import Link from 'next/link'

type Repair = {
  id: string
  vehicleInfo: string
  customerName: string
  description: string
  status: 'pending' | 'in progress' | 'completed'
  date: string
  interventions: {
    id: string
    description: string
    date: string
  }[]
  files: {
    id: string
    name: string
    url: string
  }[]
}

const statusColors = {
  pending: "bg-yellow-500",
  'in progress': "bg-blue-500",
  completed: "bg-green-500"
}

// Props pour le composant
type RepairDetailsProps = {
  repairId: string
}

export default function RepairDetails({ repairId }: RepairDetailsProps) {
  const [repair, setRepair] = useState<Repair | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newIntervention, setNewIntervention] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const fetchRepairDetails = async () => {
      setIsLoading(true)
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        const mockRepair: Repair = {
          id: '1',
          vehicleInfo: 'Toyota Camry 2018',
          customerName: 'John Doe',
          description: 'Oil change and tire rotation',
          status: 'in progress',
          date: '2023-05-15',
          interventions: [
            { id: '1', description: 'Drained old oil', date: '2023-05-15 10:00 AM' },
            { id: '2', description: 'Replaced oil filter', date: '2023-05-15 10:30 AM' },
          ],
          files: [
            { id: '1', name: 'oil_change.jpg', url: '/placeholder.svg' },
            { id: '2', name: 'tire_rotation.jpg', url: '/placeholder.svg' },
          ]
        }
        setRepair(mockRepair)
      } catch (error) {
        console.error('Error fetching repair details:', error)
        toast({
          title: "Error",
          description: "Failed to fetch repair details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (repairId) {
      fetchRepairDetails()
    }
  }, [repairId, toast])

  const handleStatusChange = (newStatus: string) => {
    if (repair) {
      setRepair({ ...repair, status: newStatus as Repair['status'] })
      toast({
        title: "Status Updated",
        description: `Repair status updated to ${newStatus}`,
      })
    }
  }

  const handleAddIntervention = () => {
    if (repair && newIntervention.trim()) {
      const newInterventionItem = {
        id: `${repair.interventions.length + 1}`,
        description: newIntervention.trim(),
        date: new Date().toLocaleString(),
      }
      setRepair({
        ...repair,
        interventions: [...repair.interventions, newInterventionItem],
      })
      setNewIntervention('')
      toast({
        title: "Intervention Added",
        description: "New intervention has been added to the repair.",
      })
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && repair) {
      const newFile = {
        id: `${repair.files.length + 1}`,
        name: file.name,
        url: URL.createObjectURL(file),
      }
      setRepair({
        ...repair,
        files: [...repair.files, newFile],
      })
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: "Customer has been notified of the repair status.",
    })
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!repair) {
    return <div className="text-center py-4">Repair not found</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Repair Details</h1>
        <Button variant="outline" asChild>
          <Link href="/repairs">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Repairs
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Repair Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Vehicle:</strong> {repair.vehicleInfo}</p>
              <p><strong>Customer:</strong> {repair.customerName}</p>
              <p><strong>Description:</strong> {repair.description}</p>
              <p><strong>Date:</strong> {repair.date}</p>
            </div>
            <div>
              <p><strong>Status:</strong></p>
              <Select value={repair.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Badge className={`${statusColors[repair.status]} text-white mt-2`}>
                {repair.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interventions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {repair.interventions.map((intervention) => (
              <div key={intervention.id} className="border-b pb-2">
                <p><strong>{intervention.date}</strong></p>
                <p>{intervention.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Textarea
              placeholder="Add new intervention..."
              value={newIntervention}
              onChange={(e) => setNewIntervention(e.target.value)}
            />
            <Button onClick={handleAddIntervention} className="mt-2">
              Add Intervention
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Photos/Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {repair.files.map((file) => (
              <div key={file.id} className="border rounded p-2">
                <img src={file.url} alt={file.name} className="w-full h-32 object-cover" />
                <p className="text-sm mt-1">{file.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              
              accept="image/*,video/*"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" /> Upload File
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSendNotification}>
          <Send className="mr-2 h-4 w-4" /> Notify Customer
        </Button>
      </div>
    </div>
  )
}