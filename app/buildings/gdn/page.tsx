import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BuildingFloorPlan } from "@/components/building-floor-plan"
import { MapPin, Users, SquareIcon as SquareFeet, School, Calendar } from "lucide-react"

export default function GDNPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">G.D. Naidu Block (GDN)</h1>
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image src="/placeholder.svg?height=720&width=1280" alt="GDN Building" fill className="object-cover" />
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The <strong>G.D. Naidu Block</strong> is named after the great industrialist and philanthropist
              <strong> Gopalswamy Doraiswamy Naidu</strong>, who is often referred to as the "Edison of India" for his
              numerous inventions and contributions to engineering.
            </p>
            <p>
              This building primarily serves as a <strong>Workshop cum Laboratory building</strong> and houses various
              schools and departments, including the <strong>School of Mechanical Engineering (SMEC)</strong>. The
              building is known for its industrial-grade facilities and equipment that provide students with hands-on
              experience in manufacturing, fabrication, and engineering design.
            </p>
            <p>
              GDN is equipped with state-of-the-art workshops, including the{" "}
              <strong>Centre of Excellence in Additive Manufacturing</strong>, which features advanced 3D printing and
              prototyping facilities. The building also houses specialized labs for welding, machining, and other
              mechanical engineering processes.
            </p>
          </div>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Building Information</CardTitle>
              <CardDescription>Key details about GDN</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">West Campus, VIT Vellore</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    Workshops: 30-40 students
                    <br />
                    Additive Manufacturing Lab: 50 students
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <SquareFeet className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Area</p>
                  <p className="text-sm text-muted-foreground">
                    Welding Shop: 1745 sq. ft.
                    <br />
                    Additive Manufacturing: 4803 sq. ft.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <School className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Schools & Departments</p>
                  <p className="text-sm text-muted-foreground">
                    School of Mechanical Engineering (SMEC)
                    <br />
                    Centre of Excellence in Additive Manufacturing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {gdnEvents.map((event) => (
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
            {gdnVenues.map((venue) => (
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
          <BuildingFloorPlan building="gdn" />
        </TabsContent>
        <TabsContent value="facilities" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workshops</CardTitle>
                <CardDescription>Industrial-grade facilities for hands-on learning</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Welding Shop</span>
                    <span className="text-muted-foreground">1745 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Machine Shop</span>
                    <span className="text-muted-foreground">1500 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Carpentry Workshop</span>
                    <span className="text-muted-foreground">1200 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Advanced Manufacturing</CardTitle>
                <CardDescription>Cutting-edge technologies and equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Centre of Excellence in Additive Manufacturing</span>
                    <span className="text-muted-foreground">4803 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>3D Printing Lab</span>
                    <span className="text-muted-foreground">1200 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>CNC Machining Center</span>
                    <span className="text-muted-foreground">1500 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Faculty Areas</CardTitle>
                <CardDescription>Spaces for faculty and staff</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Head of the Department Office</span>
                    <span className="text-muted-foreground">710 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Staff Rooms</span>
                    <span className="text-muted-foreground">47-61 sq. ft. each</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Faculty Meeting Room</span>
                    <span className="text-muted-foreground">300 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Facilities</CardTitle>
                <CardDescription>Resources for student learning and projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Project Work Area</span>
                    <span className="text-muted-foreground">1000 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Design Studio</span>
                    <span className="text-muted-foreground">800 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Student Collaboration Space</span>
                    <span className="text-muted-foreground">600 sq. ft.</span>
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
              <CardDescription>Reserve a workshop, lab, or meeting space</CardDescription>
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
                      <option value="welding-shop">Welding Shop</option>
                      <option value="additive-manufacturing">Centre of Excellence in Additive Manufacturing</option>
                      <option value="machine-shop">Machine Shop</option>
                      <option value="design-studio">Design Studio</option>
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

const gdnVenues = [
  {
    id: "welding-shop",
    name: "Welding Shop",
    type: "Laboratory",
    location: "GDN Ground Floor",
    capacity: "30",
    area: "1745 sq. ft.",
    facilities: "Welding Equipment, Safety Gear, Ventilation Systems",
  },
  {
    id: "additive-manufacturing",
    name: "Centre of Excellence in Additive Manufacturing",
    type: "Laboratory",
    location: "GDN Ground Floor",
    capacity: "50",
    area: "4803 sq. ft.",
    facilities: "3D Printers, CAD Workstations, Material Testing Equipment",
  },
  {
    id: "machine-shop",
    name: "Machine Shop",
    type: "Laboratory",
    location: "GDN Ground Floor",
    capacity: "35",
    area: "1500 sq. ft.",
    facilities: "Lathes, Milling Machines, CNC Equipment",
  },
  {
    id: "hod-office",
    name: "Head of the Department Office",
    type: "Office",
    location: "GDN Ground Floor",
    capacity: "10",
    area: "710 sq. ft.",
    facilities: "Meeting Table, Presentation Equipment, Air Conditioning",
  },
  {
    id: "design-studio",
    name: "Design Studio",
    type: "Classroom",
    location: "GDN First Floor",
    capacity: "40",
    area: "800 sq. ft.",
    facilities: "Drafting Tables, CAD Workstations, 3D Visualization Tools",
  },
  {
    id: "project-area",
    name: "Project Work Area",
    type: "Laboratory",
    location: "GDN First Floor",
    capacity: "45",
    area: "1000 sq. ft.",
    facilities: "Workbenches, Hand Tools, Project Storage Space",
  },
]

const gdnEvents = [
  {
    id: "9",
    name: "Manufacturing Innovation Expo",
    date: "November 5, 2024",
    venue: "GDN Workshop",
  },
  {
    id: "11",
    name: "3D Printing Workshop",
    date: "April 5, 2025",
    venue: "Centre of Excellence in Additive Manufacturing",
  },
  {
    id: "12",
    name: "Industrial Design Competition",
    date: "May 10, 2025",
    venue: "GDN Design Studio",
  },
]

