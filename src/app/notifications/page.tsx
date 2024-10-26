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
import { Search, Mail, MessageSquare, Bell, Calendar, Send } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

type Notification = {
  id: string
  type: 'email' | 'SMS' | 'push'
  content: string
  date: string
  status: 'sent' | 'pending'
}

const typeIcons = {
  email: <Mail className="h-4 w-4" />,
  SMS: <MessageSquare className="h-4 w-4" />,
  push: <Bell className="h-4 w-4" />
}

const statusColors = {
  sent: "bg-green-500",
  pending: "bg-yellow-500"
}

export default function NotificationsManagement() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true)
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        const mockNotifications: Notification[] = [
          { id: '1', type: 'email', content: 'Your vehicle is ready for pickup', date: '2023-05-15 10:00 AM', status: 'sent' },
          { id: '2', type: 'SMS', content: 'Reminder: Scheduled maintenance tomorrow', date: '2023-05-20 09:00 AM', status: 'pending' },
          { id: '3', type: 'push', content: 'New offer: 20% off on next service', date: '2023-05-25 11:00 AM', status: 'sent' },
        ]
        setNotifications(mockNotifications)
        setFilteredNotifications(mockNotifications)
      } catch (error) {
        console.error('Error fetching notifications:', error)
        toast({
          title: "Error",
          description: "Failed to fetch notifications. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotifications()
  }, [toast])

  useEffect(() => {
    const filtered = notifications.filter(notification => 
      notification.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === 'all' || notification.type === typeFilter) &&
      (statusFilter === 'all' || notification.status === statusFilter)
    )
    setFilteredNotifications(filtered)
  }, [searchTerm, typeFilter, statusFilter, notifications])

  const handleReschedule = (id: string, newDate: Date) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, date: newDate.toLocaleString(), status: 'pending' } : notification
    ))
    toast({
      title: "Notification Rescheduled",
      description: `Notification rescheduled to ${newDate.toLocaleString()}`,
    })
  }

  const handleResend = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, status: 'sent', date: new Date().toLocaleString() } : notification
    ))
    toast({
      title: "Notification Resent",
      description: "Notification has been resent successfully.",
    })
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Notifications Management</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full sm:w-[300px]"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="SMS">SMS</SelectItem>
              <SelectItem value="push">Push</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredNotifications.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {typeIcons[notification.type]}
                    {notification.type}
                  </div>
                </TableCell>
                <TableCell>{notification.content}</TableCell>
                <TableCell>{notification.date}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[notification.status]} text-white`}>
                    {notification.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Reschedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Reschedule Notification</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="date">Select new date</Label>
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={() => {
                            if (selectedDate) {
                              handleReschedule(notification.id, selectedDate)
                            }
                          }}>Confirm Reschedule</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={() => handleResend(notification.id)}>
                      <Send className="mr-2 h-4 w-4" />
                      Resend
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4">No notifications found</div>
      )}
    </div>
  )
}
