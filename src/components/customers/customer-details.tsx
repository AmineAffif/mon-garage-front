'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Car, Wrench, MessageSquare, Send } from 'lucide-react'

// Types
type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
}

type Repair = {
  id: string
  date: string
  description: string
  cost: number
}

type Message = {
  id: string
  sender: 'customer' | 'garage'
  content: string
  timestamp: string
}

type CustomerDetails = {
  id: string
  name: string
  email: string
  phone: string
  vehicles: Vehicle[]
  repairs: Repair[]
  messages: Message[]
}

// Props pour le composant
type CustomerDetailsProps = {
  customerId: string
}

export default function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const [customer, setCustomer] = useState<CustomerDetails | null>(null)
  const [newMessage, setNewMessage] = useState('')

  // Mock fetch function (remplacer plus tard par un appel API réel)
  useEffect(() => {
    // Simuler le chargement des données pour le client spécifié par `customerId`
    const fetchCustomerData = async () => {
      // Remplace cette partie par une requête API vers le backend
      const mockData: CustomerDetails = {
        id: customerId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        vehicles: [
          { id: 'v1', make: 'Toyota', model: 'Camry', year: 2018, licensePlate: 'ABC123' },
          { id: 'v2', make: 'Honda', model: 'Civic', year: 2020, licensePlate: 'XYZ789' },
        ],
        repairs: [
          { id: 'r1', date: '2023-05-15', description: 'Oil change and tire rotation', cost: 89.99 },
          { id: 'r2', date: '2023-03-10', description: 'Brake pad replacement', cost: 250.00 },
        ],
        messages: [
          { id: 'm1', sender: 'customer', content: 'When will my car be ready?', timestamp: '2023-05-16 10:30:00' },
          { id: 'm2', sender: 'garage', content: 'Your car will be ready by 5 PM today.', timestamp: '2023-05-16 11:15:00' },
        ],
      }
      setCustomer(mockData)
    }
    fetchCustomerData()
  }, [customerId])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: `m${(customer?.messages?.length ?? 0) + 1}`,
        sender: 'garage',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      setCustomer(prev => prev ? ({
        ...prev,
        messages: [...prev.messages, newMsg],
      }) : prev)
      setNewMessage('')
    }
  }

  if (!customer) {
    return <p>Loading customer data...</p>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${customer.name}`} />
              <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <p className="text-muted-foreground">{customer.email}</p>
              <p className="text-muted-foreground">{customer.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vehicles">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="repairs">Repair History</TabsTrigger>
          <TabsTrigger value="chat">Customer Support</TabsTrigger>
        </TabsList>
        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Associated Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              {customer.vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <Car className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                      <p className="text-sm text-muted-foreground">License Plate: {vehicle.licensePlate}</p>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="repairs">
          <Card>
            <CardHeader>
              <CardTitle>Repair History</CardTitle>
            </CardHeader>
            <CardContent>
              {customer.repairs.map((repair) => (
                <div key={repair.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <Wrench className="h-6 w-6" />
                    <div>
                      <p className="font-semibold">{repair.description}</p>
                      <p className="text-sm text-muted-foreground">Date: {repair.date}</p>
                      <p className="text-sm text-muted-foreground">Cost: ${repair.cost.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Customer Support Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full pr-4">
                {customer.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'garage' ? 'justify-end' : 'justify-start'} mb-4`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'garage' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex items-center mt-4">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage} className="ml-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
