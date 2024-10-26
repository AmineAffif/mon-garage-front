'use client'

import { Bell, Car, Search, Users, Wrench, MessageCircleMore } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface QuickAccessCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  description: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
}

export default function GarageDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Garage Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers, vehicles, repairs..."
                className="pl-8 w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QuickAccessCard
            title="Customers"
            icon={<Users className="h-6 w-6" />}
            href="/customers"
            description="Manage your customer database"
          />
          <QuickAccessCard
            title="Vehicles"
            icon={<Car className="h-6 w-6" />}
            href="/vehicles"
            description="Track and manage vehicles"
          />
          <QuickAccessCard
            title="Repairs"
            icon={<Wrench className="h-6 w-6" />}
            href="/repairs"
            description="Oversee ongoing and completed repairs"
          />
          <QuickAccessCard
            title="Notifications"
            icon={<Bell className="h-6 w-6" />}
            href="/notifications"
            description="View and manage notifications"
          />
          <QuickAccessCard
            title="Conversations"
            icon={<MessageCircleMore className="h-6 w-6" />}
            href="/conversations"
            description="Chat with customers"
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Repairs in Progress" value="12" />
          <StatCard title="Active Customers" value="87" />
          <StatCard title="Recent Interventions" value="23" />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View 5 New Notifications</Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

function QuickAccessCard({ title, icon, href, description }: QuickAccessCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
        <Button asChild>
          <Link href={href}>View {title}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}


