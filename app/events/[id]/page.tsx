"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Download } from "lucide-react"
import { allEvents } from "@/data/events"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<any>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the event with the matching ID
    const eventId = params.id as string
    const foundEvent = allEvents.find((e) => e.id === eventId)

    if (foundEvent) {
      setEvent(foundEvent)

      // Check if user is registered (in a real app, this would come from a database)
      try {
        const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]")
        setIsRegistered(registeredEvents.includes(eventId))
      } catch (error) {
        console.error("Error checking registration status:", error)
        // If there's an error, assume not registered
        setIsRegistered(false)
      }
    }

    setLoading(false)
  }, [params.id])

  const handleRegister = () => {
    if (!event) return

    try {
      // Toggle registration status
      const registeredEvents = JSON.parse(localStorage.getItem("registeredEvents") || "[]")

      if (isRegistered) {
        // Remove from registered events
        const updatedEvents = registeredEvents.filter((id: string) => id !== event.id)
        localStorage.setItem("registeredEvents", JSON.stringify(updatedEvents))
        setIsRegistered(false)
      } else {
        // Add to registered events
        registeredEvents.push(event.id)
        localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents))
        setIsRegistered(true)
      }
    } catch (error) {
      console.error("Error updating registration:", error)
      // Handle the error appropriately
    }
  }

  if (loading) {
    return (
      <div className="container py-16 text-center">
        <p>Loading event details...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/events")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    )
  }

  const isPastEvent = new Date(event.date) < new Date()

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/events")} className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image
              src={event.image || "/placeholder.svg?height=720&width=1280"}
              alt={event.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant={isPastEvent ? "secondary" : "default"}>
              {isPastEvent ? "Past Event" : "Upcoming Event"}
            </Badge>
            {event.category && <Badge variant="outline">{event.category}</Badge>}
          </div>

          <h1 className="text-4xl font-bold mb-4">{event.name}</h1>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{event.date}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{event.venue}</span>
            </div>
            {event.capacity && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Capacity: {event.capacity}</span>
              </div>
            )}
          </div>

          <Tabs defaultValue="about" className="mb-8">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg">{event.description}</p>
                <p>
                  Join us for this exciting event at VIT Vellore. This event is designed to provide participants with
                  valuable insights and hands-on experience in {event.category?.toLowerCase() || "this field"}.
                </p>
                <h3>What You'll Learn</h3>
                <ul>
                  <li>Gain practical knowledge and skills</li>
                  <li>Network with industry professionals and peers</li>
                  <li>Explore the latest trends and innovations</li>
                  <li>Participate in interactive sessions and workshops</li>
                </ul>
                <h3>Who Should Attend</h3>
                <p>
                  This event is perfect for students, faculty members, and professionals interested in
                  {event.category ? ` ${event.category.toLowerCase()}` : " this area"}. Whether you're a beginner or an
                  expert, there's something for everyone.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="pt-6">
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-md p-2 font-medium">
                      {event.time ? event.time.split("-")[0].trim() : "9:00 AM"}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Opening Ceremony</h3>
                      <p className="text-muted-foreground">Welcome address and introduction to the event</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-md p-2 font-medium">
                      {event.time ? Number.parseInt(event.time.split(":")[0]) + 1 + ":00 AM" : "10:00 AM"}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Main Session</h3>
                      <p className="text-muted-foreground">Keynote presentation and interactive discussions</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-md p-2 font-medium">
                      {event.time ? Number.parseInt(event.time.split(":")[0]) + 3 + ":00 PM" : "12:00 PM"}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Lunch Break</h3>
                      <p className="text-muted-foreground">Networking opportunity with refreshments</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-md p-2 font-medium">
                      {event.time ? event.time.split("-")[1].trim() : "4:00 PM"}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Closing Session</h3>
                      <p className="text-muted-foreground">Wrap-up, Q&A, and certificate distribution</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="speakers" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt="Speaker"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Dr. Rajesh Kumar</h3>
                        <p className="text-sm text-muted-foreground">Professor, VIT University</p>
                        <p className="text-sm mt-2">
                          Expert in {event.category || "this field"} with over 15 years of experience.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt="Speaker"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Dr. Priya Sharma</h3>
                        <p className="text-sm text-muted-foreground">Associate Professor, VIT University</p>
                        <p className="text-sm mt-2">
                          Renowned researcher with multiple publications in leading journals.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Registration</h2>
                {!isPastEvent ? (
                  <>
                    <p className="mb-6 text-muted-foreground">
                      Secure your spot for this exciting event. Limited seats available!
                    </p>
                    <Button
                      className="w-full mb-4"
                      variant={isRegistered ? "outline" : "default"}
                      onClick={handleRegister}
                    >
                      {isRegistered ? "Cancel Registration" : "Register Now"}
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="mb-6 text-muted-foreground">
                      This event has already taken place. Check out our upcoming events.
                    </p>
                    <Link href="/events">
                      <Button className="w-full mb-4">View Upcoming Events</Button>
                    </Link>
                  </>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-1">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Venue Information</h2>
                <div className="relative h-40 rounded-md overflow-hidden mb-4">
                  <Image src="/placeholder.svg?height=300&width=500" alt="Venue" fill className="object-cover" />
                </div>
                <h3 className="font-medium">{event.venue}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {getVenueBuilding(event.venue)}, VIT Vellore Campus
                </p>
                <Link href={`/venues/${getVenueId(event.venue)}`}>
                  <Button variant="outline" className="w-full">
                    View Venue Details
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Related Events</h2>
                <div className="space-y-4">
                  {getRelatedEvents(event.id, event.category).map((relatedEvent) => (
                    <Link href={`/events/${relatedEvent.id}`} key={relatedEvent.id}>
                      <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                        <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{relatedEvent.name}</p>
                          <p className="text-sm text-muted-foreground">{relatedEvent.date}</p>
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
function getVenueBuilding(venue: string): string {
  if (venue.includes("TT")) return "Technology Tower"
  if (venue.includes("CDMM")) return "Centre of Disaster Mitigation and Management"
  if (venue.includes("SMV")) return "Sri M Vishveshwaraiah Building"
  if (venue.includes("GDN")) return "G.D. Naidu Block"
  return "Main Campus"
}

function getVenueId(venue: string): string {
  if (venue.includes("Ambedkar")) return "ambedkar"
  if (venue.includes("Kamaraj")) return "kamaraj"
  if (venue.includes("TBI")) return "tbi-conf"
  if (venue.includes("TIFAC")) return "tifac-conf"
  if (venue.includes("CDMM Conference")) return "cdmm-conf"
  if (venue.includes("GIS Lab")) return "gis-lab"
  if (venue.includes("SMV 101")) return "smv-101"
  if (venue.includes("SMV 312")) return "biotech-lab"
  return "ambedkar" // Default fallback
}

function getRelatedEvents(currentId: string, category?: string): any[] {
  // Filter events with the same category, excluding the current event
  let related = allEvents.filter((event) => event.id !== currentId && (category ? event.category === category : true))

  // If we don't have enough related events by category, add some others
  if (related.length < 3) {
    const others = allEvents.filter((event) => event.id !== currentId && (!category || event.category !== category))
    related = [...related, ...others]
  }

  // Return up to 3 related events
  return related.slice(0, 3)
}

