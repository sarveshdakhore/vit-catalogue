"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, SquareIcon as SquareFeet, Calendar, ArrowLeft, Building } from "lucide-react"
import { allVenues } from "@/data/venues"
import { allEvents } from "@/data/events"

export default function VenueDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [venue, setVenue] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the venue with the matching ID
    const venueId = params.id as string
    const foundVenue = allVenues.find((v) => v.id === venueId)

    if (foundVenue) {
      setVenue(foundVenue)
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <p>Loading venue details...</p>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Venue Not Found</h1>
        <p className="mb-8">The venue you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/venues")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Venues
        </Button>
      </div>
    )
  }

  // Get events happening at this venue
  const venueEvents = allEvents.filter(
    (event) =>
      event.venue.toLowerCase().includes(venue.name.toLowerCase()) ||
      event.venue.toLowerCase().includes(venue.id.toLowerCase()),
  )

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/venues")} className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Venues
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={venue.image || "/placeholder.svg?height=720&width=1280"}
              alt={venue.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
                {venue.type}
              </Badge>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{venue.name}</h1>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <span>{venue.building} Building</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{venue.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Capacity: {venue.capacity}</span>
            </div>
            <div className="flex items-center gap-2">
              <SquareFeet className="h-5 w-5 text-primary" />
              <span>Area: {venue.area}</span>
            </div>
          </div>

          <Tabs defaultValue="about" className="mb-8">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">{venue.description}</p>
                <p>
                  Located in the {venue.building} building on the {venue.location}, this {venue.type.toLowerCase()}
                  is designed to provide an optimal environment for {getVenueUseCase(venue.type)}.
                </p>
                <h3>Features</h3>
                <ul>
                  <li>Capacity for {venue.capacity} people</li>
                  <li>Total area of {venue.area}</li>
                  <li>{venue.facilities}</li>
                  <li>Modern design with excellent acoustics and visibility</li>
                  <li>Fully accessible with wheelchair ramps and facilities</li>
                </ul>
                <h3>Usage Guidelines</h3>
                <p>
                  This venue is available for academic events, conferences, workshops, and other institutional
                  activities. Booking requests must be submitted at least 7 days in advance for proper processing and
                  approval.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="facilities" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Equipment</CardTitle>
                    <CardDescription>Standard equipment provided with the venue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {venue.facilities.split(", ").map((facility: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span>{facility}</span>
                        </li>
                      ))}
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Wi-Fi Connectivity</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Power Outlets</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Services</CardTitle>
                    <CardDescription>Services available upon request</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Technical Support Staff</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Catering Services</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Recording Equipment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Live Streaming Setup</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Additional Seating Arrangements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="events" className="pt-6">
              {venueEvents.length > 0 ? (
                <div className="space-y-4">
                  {venueEvents.map((event) => (
                    <Link href={`/events/${event.id}`} key={event.id}>
                      <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <Calendar className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h3 className="font-medium">{event.name}</h3>
                                <p className="text-sm text-muted-foreground">{event.date}</p>
                                {event.time && <p className="text-sm text-muted-foreground">{event.time}</p>}
                              </div>
                            </div>
                            {event.category && <Badge variant="outline">{event.category}</Badge>}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No upcoming events scheduled at this venue.</p>
                  <Link href="/events">
                    <Button variant="outline">Browse All Events</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Book This Venue</h2>
                <p className="mb-6 text-muted-foreground">
                  Reserve this venue for your event, meeting, or academic activity.
                </p>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <input type="date" id="date" className="w-full p-2 border rounded-md" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="start-time" className="text-sm font-medium">
                        Start Time
                      </label>
                      <input type="time" id="start-time" className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="end-time" className="text-sm font-medium">
                        End Time
                      </label>
                      <input type="time" id="end-time" className="w-full p-2 border rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="purpose" className="text-sm font-medium">
                      Purpose
                    </label>
                    <textarea
                      id="purpose"
                      rows={3}
                      className="w-full p-2 border rounded-md"
                      placeholder="Describe the purpose of your booking"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="attendees" className="text-sm font-medium">
                      Expected Attendees
                    </label>
                    <input
                      type="number"
                      id="attendees"
                      className="w-full p-2 border rounded-md"
                      placeholder="Number of attendees"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Location</h2>
                <div className="relative h-40 rounded-md overflow-hidden mb-4 bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Campus Map</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {venue.building} Building, {venue.location}
                  <br />
                  VIT University, Vellore Campus
                  <br />
                  Tamil Nadu, India
                </p>
                <Link href={`/buildings/${venue.building.toLowerCase()}`}>
                  <Button variant="outline" className="w-full">
                    View Building Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Similar Venues</h2>
                <div className="space-y-4">
                  {getSimilarVenues(venue.id, venue.type).map((similarVenue) => (
                    <Link href={`/venues/${similarVenue.id}`} key={similarVenue.id}>
                      <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{similarVenue.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {similarVenue.building} • {similarVenue.location}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getVenueUseCase(type: string): string {
  switch (type.toLowerCase()) {
    case "auditorium":
      return "conferences, seminars, and cultural events"
    case "conference":
      return "meetings, discussions, and presentations"
    case "laboratory":
      return "research, experiments, and practical learning"
    case "classroom":
      return "lectures, tutorials, and group activities"
    case "seminar":
      return "workshops, training sessions, and academic presentations"
    default:
      return "various academic and institutional activities"
  }
}

function getSimilarVenues(currentId: string, type: string): any[] {
  // Filter venues with the same type, excluding the current venue
  let similar = allVenues.filter((venue) => venue.id !== currentId && venue.type.toLowerCase() === type.toLowerCase())

  // If we don't have enough similar venues by type, add some others
  if (similar.length < 3) {
    const others = allVenues.filter(
      (venue) => venue.id !== currentId && venue.type.toLowerCase() !== type.toLowerCase(),
    )
    similar = [...similar, ...others]
  }

  // Return up to 3 similar venues
  return similar.slice(0, 3)
}

