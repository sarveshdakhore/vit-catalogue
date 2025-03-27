"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, CheckCircle2, XCircle } from "lucide-react"

export default function DashboardPage() {
  // In a real application, this would come from a database or API
  const [registeredEvents, setRegisteredEvents] = useState(sampleRegisteredEvents)
  const [bookingRequests, setBookingRequests] = useState(sampleBookingRequests)

  const cancelRegistration = (eventId: string) => {
    setRegisteredEvents(registeredEvents.filter((event) => event.id !== eventId))
  }

  const cancelBooking = (bookingId: string) => {
    setBookingRequests(bookingRequests.filter((booking) => booking.id !== bookingId))
  }

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Registered Events</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold">{registeredEvents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Booking Requests</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold">{bookingRequests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-bold">
              {registeredEvents.filter((event) => new Date(event.date) > new Date()).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="events">My Events</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Registered Events</h2>
            {registeredEvents.length > 0 ? (
              registeredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:w-3/4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{event.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <Badge variant={new Date(event.date) > new Date() ? "default" : "secondary"}>
                          {new Date(event.date) > new Date() ? "Upcoming" : "Past"}
                        </Badge>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="bg-muted p-6 flex flex-col justify-center items-center md:w-1/4">
                      <Link href={`/events/${event.id}`}>
                        <Button variant="outline" className="w-full mb-2">
                          View Details
                        </Button>
                      </Link>
                      {new Date(event.date) > new Date() && (
                        <Button variant="destructive" className="w-full" onClick={() => cancelRegistration(event.id)}>
                          Cancel Registration
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
                  <Link href="/events">
                    <Button>Browse Events</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Venue Booking Requests</h2>
            {bookingRequests.length > 0 ? (
              bookingRequests.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:w-3/4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{booking.venue}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Clock className="h-4 w-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {booking.status === "Approved" ? (
                              <Badge className="bg-green-500">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Approved
                              </Badge>
                            ) : booking.status === "Rejected" ? (
                              <Badge variant="destructive">
                                <XCircle className="h-3 w-3 mr-1" />
                                Rejected
                              </Badge>
                            ) : (
                              <Badge variant="outline">Pending</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium">Purpose:</p>
                        <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                      </div>
                      {booking.notes && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Notes:</p>
                          <p className="text-sm text-muted-foreground">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-muted p-6 flex flex-col justify-center items-center md:w-1/4">
                      <Link href={`/venues/${booking.venueId}`}>
                        <Button variant="outline" className="w-full mb-2">
                          View Venue
                        </Button>
                      </Link>
                      {booking.status === "Pending" && (
                        <Button variant="destructive" className="w-full" onClick={() => cancelBooking(booking.id)}>
                          Cancel Request
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't made any venue booking requests yet.</p>
                  <Link href="/venues">
                    <Button>Browse Venues</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const sampleRegisteredEvents = [
  {
    id: "1",
    name: "Moonscribing 3.0",
    date: "March 26, 2025",
    time: "2:00 PM - 5:00 PM",
    venue: "SMV101",
    description: "A creative writing workshop for students interested in poetry and prose.",
  },
  {
    id: "3",
    name: "E-Summit 2025",
    date: "March 6, 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "TT Auditorium",
    description: "Annual entrepreneurship summit featuring speakers from leading startups.",
  },
  {
    id: "8",
    name: "Disaster Management Seminar",
    date: "December 10, 2024",
    time: "10:00 AM - 1:00 PM",
    venue: "CDMM GIS Lab",
    description:
      "Seminar on disaster preparedness and mitigation strategies. Learn from experts about the latest approaches to managing natural and man-made disasters.",
  },
]

const sampleBookingRequests = [
  {
    id: "b1",
    venueId: "ambedkar",
    venue: "Dr. B.R Ambedkar Auditorium",
    date: "April 15, 2025",
    time: "10:00 AM - 1:00 PM",
    purpose: "Department Technical Symposium",
    status: "Approved",
    notes: "Approved by Dean of Academic Affairs",
  },
  {
    id: "b2",
    venueId: "tbi-conf",
    venue: "Conference Hall @ TBI",
    date: "March 30, 2025",
    time: "2:00 PM - 4:00 PM",
    purpose: "Research Group Meeting",
    status: "Pending",
  },
  {
    id: "b3",
    venueId: "kamaraj",
    venue: "Kamaraj Auditorium",
    date: "February 10, 2025",
    time: "9:00 AM - 12:00 PM",
    purpose: "Guest Lecture on AI Ethics",
    status: "Rejected",
    notes: "Venue already booked for another event. Please try an alternative date or venue.",
  },
]

