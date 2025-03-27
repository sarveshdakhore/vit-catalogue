import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BuildingFloorPlan } from "@/components/building-floor-plan"
import { MapPin, Users, SquareIcon as SquareFeet, School, Calendar } from "lucide-react"

export default function CDMMPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Centre of Disaster Mitigation and Management (CDMM)</h1>
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image src="/placeholder.svg?height=720&width=1280" alt="CDMM Building" fill className="object-cover" />
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The Centre was inaugurated in January 2006 by the Honorable Home Minister of India{" "}
              <strong>Shri. Shivraj Patil</strong> in the gracious presence of <strong>General NC Vij</strong>, Vice
              Chairman, National Disaster Management Authority, Government of India. The center is patronized by{" "}
              <strong>VIT University</strong> with state-of-the-art infrastructure.
            </p>
            <p>
              It was the first centre to be set up in India for disaster mitigation and management after the{" "}
              <strong>National Disaster Management Act</strong> was passed in Parliament in December 2005.
            </p>
            <p>
              The building consists of <strong>5 floors</strong> in total, including regular classrooms, faculty cabins,
              smart classrooms, research labs, and dedicated CDMM facilities.
            </p>
          </div>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Building Information</CardTitle>
              <CardDescription>Key details about CDMM</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">North Campus, VIT Vellore</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    Conference Room: 30 seats
                    <br />
                    GIS Lab: 40 seats
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <SquareFeet className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Area</p>
                  <p className="text-sm text-muted-foreground">
                    Conference Room: 449 sq. ft.
                    <br />
                    GIS Lab: 916 sq. ft.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <School className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Focus Areas</p>
                  <p className="text-sm text-muted-foreground">
                    Research & Development, Disaster Education, Knowledge Networking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {cdmmEvents.map((event) => (
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
            {cdmmVenues.map((venue) => (
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
          <BuildingFloorPlan building="cdmm" />
        </TabsContent>
        <TabsContent value="facilities" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Facilities</CardTitle>
                <CardDescription>Advanced research equipment and labs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>GIS Lab</span>
                    <span className="text-muted-foreground">916 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>High Resolution Mass Spectrometry Lab</span>
                    <span className="text-muted-foreground">335 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>VSM Lab</span>
                    <span className="text-muted-foreground">303 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Meeting Spaces</CardTitle>
                <CardDescription>Rooms for discussions and planning</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Conference Room</span>
                    <span className="text-muted-foreground">449 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Director's Cabin</span>
                    <span className="text-muted-foreground">247 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Faculty Cabin</span>
                    <span className="text-muted-foreground">233 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Educational Spaces</CardTitle>
                <CardDescription>Learning and teaching areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Class Rooms</span>
                    <span className="text-muted-foreground">798 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ph.D. Scholars Sitting Place</span>
                    <span className="text-muted-foreground">313 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Special Facilities</CardTitle>
                <CardDescription>Unique research equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Single crystal XRD Lab</span>
                    <span className="text-muted-foreground">327 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Powder X-Ray Diffractometer Facility</span>
                    <span className="text-muted-foreground">300 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>EMC Wireless Test Chamber</span>
                    <span className="text-muted-foreground">1275 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="book" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Book a Venue</CardTitle>
              <CardDescription>Reserve a conference room, lab, or classroom</CardDescription>
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
                      <option value="cdmm-conf">CDMM Conference Room</option>
                      <option value="gis-lab">GIS Lab</option>
                      <option value="class-rooms">Class Rooms</option>
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

const cdmmVenues = [
  {
    id: "cdmm-conf",
    name: "CDMM Conference Room",
    type: "Conference Hall",
    location: "CDMM Second Floor",
    capacity: "30",
    area: "449 sq. ft.",
    facilities: "Smart Board, Video Conferencing, Air Conditioning",
  },
  {
    id: "gis-lab",
    name: "GIS Lab",
    type: "Laboratory",
    location: "CDMM Second Floor",
    capacity: "40",
    area: "916 sq. ft.",
    facilities: "High-end Workstations, GIS Software, Large Format Printers",
  },
  {
    id: "mass-spec-lab",
    name: "High Resolution Mass Spectrometry Lab",
    type: "Laboratory",
    location: "CDMM Ground Floor",
    capacity: "15",
    area: "335 sq. ft.",
    facilities: "Mass Spectrometers, Analysis Equipment, Workstations",
  },
  {
    id: "xrd-lab",
    name: "Single crystal XRD Lab",
    type: "Laboratory",
    location: "CDMM Ground Floor",
    capacity: "10",
    area: "327 sq. ft.",
    facilities: "X-Ray Diffractometer, Analysis Software, Safety Equipment",
  },
  {
    id: "wireless-chamber",
    name: "EMC Wireless Test Chamber",
    type: "Laboratory",
    location: "CDMM Ground Floor",
    capacity: "20",
    area: "1275 sq. ft.",
    facilities: "EMC Testing Equipment, Anechoic Chamber, Measurement Tools",
  },
  {
    id: "cdmm-classroom",
    name: "CDMM Classrooms",
    type: "Classroom",
    location: "CDMM First Floor",
    capacity: "60",
    area: "798 sq. ft.",
    facilities: "Projector, Whiteboard, Air Conditioning",
  },
]

const cdmmEvents = [
  {
    id: "4",
    name: "Yantra'25",
    date: "February 7, 2025",
    venue: "CDMM Conference Room",
  },
  {
    id: "8",
    name: "Disaster Management Seminar",
    date: "December 10, 2024",
    venue: "CDMM GIS Lab",
  },
  {
    id: "10",
    name: "GIS Workshop for Disaster Planning",
    date: "April 20, 2025",
    venue: "CDMM GIS Lab",
  },
]

