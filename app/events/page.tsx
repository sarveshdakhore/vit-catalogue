"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Search, Filter, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("all")
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])

  // Filter events based on search query and building filter
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBuilding = buildingFilter === "all" || event.venue.toLowerCase().includes(buildingFilter.toLowerCase())

    return matchesSearch && matchesBuilding
  })

  const upcomingEvents = filteredEvents.filter((event) => new Date(event.date) >= new Date())
  const pastEvents = filteredEvents.filter((event) => new Date(event.date) < new Date())

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter((id) => id !== eventId))
    } else {
      setRegisteredEvents([...registeredEvents, eventId])
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">Events & Workshops</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={buildingFilter} onValueChange={setBuildingFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by building" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Buildings</SelectItem>
              <SelectItem value="tt">Technology Tower (TT)</SelectItem>
              <SelectItem value="cdmm">CDMM</SelectItem>
              <SelectItem value="smv">SMV</SelectItem>
              <SelectItem value="gdn">GDN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
          <TabsTrigger value="registered">My Registrations</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isRegistered={registeredEvents.includes(event.id)}
                  onRegister={() => handleRegister(event.id)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No upcoming events found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPast={true}
                  isRegistered={registeredEvents.includes(event.id)}
                  onRegister={() => handleRegister(event.id)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No past events found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="registered">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredEvents.length > 0 ? (
              allEvents
                .filter((event) => registeredEvents.includes(event.id))
                .map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isPast={new Date(event.date) < new Date()}
                    isRegistered={true}
                    onRegister={() => handleRegister(event.id)}
                  />
                ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">You haven't registered for any events yet.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface EventCardProps {
  event: Event
  isPast?: boolean
  isRegistered: boolean
  onRegister: () => void
}

function EventCard({ event, isPast = false, isRegistered, onRegister }: EventCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{event.name}</CardTitle>
          {event.category && (
            <Badge variant="outline" className="ml-2">
              {event.category}
            </Badge>
          )}
        </div>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {event.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.venue}</span>
          </div>
          {event.capacity && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Capacity: {event.capacity}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!isPast ? (
          <Button variant={isRegistered ? "outline" : "default"} className="w-full" onClick={onRegister}>
            {isRegistered ? "Cancel Registration" : "Register"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Event Ended
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

interface Event {
  id: string
  name: string
  date: string
  description: string
  venue: string
  category?: string
  capacity?: string
}

const allEvents: Event[] = [
  {
    id: "1",
    name: "Moonscribing 3.0",
    date: "March 26, 2025",
    description: "A creative writing workshop for students interested in poetry and prose.",
    venue: "SMV101",
    category: "Workshop",
    capacity: "50",
  },
  {
    id: "2",
    name: "Patisserie 2.0",
    date: "March 27, 2025",
    description: "Learn the art of French pastry making with expert chefs.",
    venue: "SMV 312",
    category: "Workshop",
    capacity: "30",
  },
  {
    id: "3",
    name: "E-Summit 2025",
    date: "March 6, 2025",
    description: "Annual entrepreneurship summit featuring speakers from leading startups.",
    venue: "TT Auditorium",
    category: "Conference",
    capacity: "198",
  },
  {
    id: "4",
    name: "Yantra'25",
    date: "February 7, 2025",
    description: "Technical symposium showcasing innovative engineering projects.",
    venue: "CDMM Conference Room",
    category: "Symposium",
    capacity: "100",
  },
  {
    id: "5",
    name: "AI Research Symposium",
    date: "April 12, 2025",
    description: "Showcase of cutting-edge research in artificial intelligence and machine learning.",
    venue: "Conference Hall @ TBI",
    category: "Symposium",
    capacity: "20",
  },
  {
    id: "6",
    name: "International Conference on Nanotechnology",
    date: "May 15, 2025",
    description: "Global conference on advancements in nanotechnology research and applications.",
    venue: "Kamaraj Auditorium",
    category: "Conference",
    capacity: "128",
  },
  {
    id: "7",
    name: "Biotechnology Workshop Series",
    date: "January 15, 2025",
    description: "Hands-on workshop on advanced biotechnology techniques and methodologies.",
    venue: "SMV Biotechnology Lab",
    category: "Workshop",
    capacity: "40",
  },
  {
    id: "8",
    name: "Disaster Management Seminar",
    date: "December 10, 2024",
    description: "Seminar on disaster preparedness and mitigation strategies.",
    venue: "CDMM GIS Lab",
    category: "Seminar",
    capacity: "60",
  },
  {
    id: "9",
    name: "Manufacturing Innovation Expo",
    date: "November 5, 2024",
    description: "Exhibition showcasing innovations in manufacturing technologies.",
    venue: "GDN Workshop",
    category: "Exhibition",
    capacity: "150",
  },
]

