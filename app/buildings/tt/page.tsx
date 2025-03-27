import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BuildingFloorPlan } from "@/components/building-floor-plan"
import { MapPin, Users, SquareIcon as SquareFeet, School, Calendar } from "lucide-react"

export default function TTPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Technology Tower (TT)</h1>
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image src="/placeholder.svg?height=720&width=1280" alt="Technology Tower" fill className="object-cover" />
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The grand <strong>Technology Tower</strong>, popularly known as <strong>TT</strong>, is an architectural
              marvel. It was inaugurated by Honourable Justice Mr. Doraiswamy Raju of the Supreme Court of India, in the
              presence of Dr. K Venkatasubramanian, a member of the Planning Commission of India, Dr. G Viswanathan,
              Chancellor, and Sri G.V Selvam, Vice President.
            </p>
            <p>
              The building consists of <strong>7 floors</strong>, boasting two conference halls, multiple auditoriums,
              and various research centers. Standing tall in the middle of the campus, TT is well-known for its cooler
              temperature even during summer due to its remarkable construction.
            </p>
          </div>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Building Information</CardTitle>
              <CardDescription>Key details about Technology Tower</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Central Campus, near Food Court and Girls' Hostel</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    Dr. B.R Ambedkar Auditorium: 198 seats
                    <br />
                    Kamaraj Auditorium: 128 seats
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <SquareFeet className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Area</p>
                  <p className="text-sm text-muted-foreground">
                    Conference Hall @ TBI: 454 sq. ft.
                    <br />
                    Conference Hall @ TIFAC: 300 sq. ft.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <School className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Schools & Centers</p>
                  <p className="text-sm text-muted-foreground">SELECT, SENSE, SAS, SSL, TBI, CNR, CBST, TIFFAC-CORE</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {ttEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.venue}
                    </p>
                    <Link
                      href={`/events/${event.id}`}
                      className="text-xs text-primary hover:underline mt-1 inline-block"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-10">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="floor-plan">Floor Plan</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="book">Book a Venue</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ttVenues.map((venue) => (
              <Card key={venue.id} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {venue.name}
                    <Badge variant="outline">{venue.type}</Badge>
                  </CardTitle>
                  <CardDescription>{venue.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Capacity:</strong> {venue.capacity} people
                    </p>
                    <p className="text-sm">
                      <strong>Area:</strong> {venue.area}
                    </p>
                    <p className="text-sm">
                      <strong>Facilities:</strong> {venue.facilities}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link href={`/venues/${venue.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="floor-plan" className="mt-6">
          <BuildingFloorPlan building="tt" />
        </TabsContent>
        <TabsContent value="facilities" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auditoriums</CardTitle>
                <CardDescription>State-of-the-art auditoriums for events</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Dr. B.R Ambedkar Auditorium</span>
                    <span className="text-muted-foreground">198 seats</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Kamaraj Auditorium</span>
                    <span className="text-muted-foreground">128 seats</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conference Halls</CardTitle>
                <CardDescription>Meeting spaces for discussions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Conference Hall @ TBI</span>
                    <span className="text-muted-foreground">20 people</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Conference Hall @ TIFAC</span>
                    <span className="text-muted-foreground">14 people</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Research Centers</CardTitle>
                <CardDescription>Advanced research facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>TBI (Technology Business Incubator)</li>
                  <li>CNR (Nano Technology)</li>
                  <li>CBST (Centre for Bio-Separation Technology)</li>
                  <li>TIFFAC-CORE</li>
                  <li>Academic Staff College</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Schools</CardTitle>
                <CardDescription>Academic departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>SELECT (School of Electrical Engineering)</li>
                  <li>SENSE (School of Electronics Engineering)</li>
                  <li>SAS (School of Advanced Sciences)</li>
                  <li>SSL (School of Social Sciences and Languages)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="book" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Book a Venue</CardTitle>
              <CardDescription>Reserve an auditorium, conference hall, or classroom</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="venue" className="text-sm font-medium">
                      Venue
                    </label>
                    <select id="venue" className="w-full p-2 border rounded-md">
                      <option value="">Select a venue</option>
                      <option value="ambedkar">Dr. B.R Ambedkar Auditorium</option>
                      <option value="kamaraj">Kamaraj Auditorium</option>
                      <option value="tbi">Conference Hall @ TBI</option>
                      <option value="tifac">Conference Hall @ TIFAC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <input type="date" id="date" className="w-full p-2 border rounded-md" />
                  </div>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

const ttVenues = [
  {
    id: "ambedkar",
    name: "Dr. B.R Ambedkar Auditorium",
    type: "Auditorium",
    location: "TT Ground Floor",
    capacity: "198",
    area: "2447 sq. ft.",
    facilities: "Projector, Sound System, Air Conditioning",
  },
  {
    id: "kamaraj",
    name: "Kamaraj Auditorium",
    type: "Auditorium",
    location: "TT First Floor",
    capacity: "128",
    area: "2447 sq. ft.",
    facilities: "Projector, Sound System, Air Conditioning",
  },
  {
    id: "tbi",
    name: "Conference Hall @ TBI",
    type: "Conference Hall",
    location: "TT Third Floor",
    capacity: "20",
    area: "454 sq. ft.",
    facilities: "Projector, Video Conferencing, Whiteboard",
  },
  {
    id: "tifac",
    name: "Conference Hall @ TIFAC",
    type: "Conference Hall",
    location: "TT Fourth Floor",
    capacity: "14",
    area: "300 sq. ft.",
    facilities: "Projector, Video Conferencing, Whiteboard",
  },
  {
    id: "classroom-1",
    name: "Classroom TT-104",
    type: "Classroom",
    location: "TT First Floor",
    capacity: "60",
    area: "686 sq. ft.",
    facilities: "Projector, Smart Board, Air Conditioning",
  },
  {
    id: "lab-1",
    name: "Biochemical & Analytical Lab",
    type: "Laboratory",
    location: "TT First Floor",
    capacity: "40",
    area: "1768 sq. ft.",
    facilities: "Lab Equipment, Workstations, Safety Gear",
  },
]

const ttEvents = [
  {
    id: "1",
    name: "E-Summit 2025",
    date: "March 6, 2025",
    venue: "TT Auditorium",
  },
  {
    id: "2",
    name: "AI Research Symposium",
    date: "April 12, 2025",
    venue: "Conference Hall @ TBI",
  },
  {
    id: "3",
    name: "International Conference on Nanotechnology",
    date: "May 15-17, 2025",
    venue: "Kamaraj Auditorium",
  },
]

