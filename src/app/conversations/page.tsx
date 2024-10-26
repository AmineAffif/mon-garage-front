'use client'

import { useState } from 'react'
import { Send, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type Customer = {
  id: string
  name: string
  avatar: string
  lastMessage: string
}

type Message = {
  id: string
  sender: 'customer' | 'support'
  content: string
  timestamp: string
}

const customers: Customer[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=32&width=32', lastMessage: 'I need help with my order' },
  { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=32&width=32', lastMessage: 'How do I reset my password?' },
  { id: '3', name: 'Charlie Brown', avatar: '/placeholder.svg?height=32&width=32', lastMessage: 'Is there a discount code available?' },
]

const initialMessages: Record<string, Message[]> = {
  '1': [
    { id: '1', sender: 'customer', content: 'Hi, I need help with my order', timestamp: '10:00 AM' },
    { id: '2', sender: 'support', content: 'Hello Alice, I\'d be happy to help. Can you provide your order number?', timestamp: '10:02 AM' },
  ],
  '2': [
    { id: '1', sender: 'customer', content: 'How do I reset my password?', timestamp: '11:30 AM' },
  ],
  '3': [
    { id: '1', sender: 'customer', content: 'Is there a discount code available?', timestamp: '12:15 PM' },
  ],
}

export default function Component() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedCustomer) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: 'support',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => ({
        ...prev,
        [selectedCustomer.id]: [...(prev[selectedCustomer.id] || []), newMsg],
      }))
      setNewMessage('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r">
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {customers.map(customer => (
                <div
                  key={customer.id}
                  className={`flex items-center space-x-4 p-4 cursor-pointer hover:bg-gray-100 ${
                    selectedCustomer?.id === customer.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <Avatar>
                    <AvatarImage src={customer.avatar} alt={customer.name} />
                    <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{customer.name}</p>
                    <p className="text-sm text-gray-500 truncate">{customer.lastMessage}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedCustomer ? (
          <>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>{selectedCustomer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  {messages[selectedCustomer.id]?.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'support' ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'support' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <div className="p-4 bg-white border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a customer to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}