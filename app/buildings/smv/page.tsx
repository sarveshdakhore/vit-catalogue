import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BuildingFloorPlan } from "@/components/building-floor-plan"
import { MapPin, Users, SquareIcon as SquareFeet, School, Calendar } from "lucide-react"

export default function SMVPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">Sri M Vishveshwaraiah Building (SMV)</h1>
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
            <Image src="/placeholder.svg?height=720&width=1280" alt="SMV Building" fill className="object-cover" />
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              The <strong>Sir M Vishveshvaraiya Building</strong> was inaugurated by Hon'ble{" "}
              <strong>Dr. Kalaignar M. Karunanidhi</strong>, Former Chief Minister of Tamil Nadu, under the
              president-ship of Hon'ble <strong>Thiru Durai Murugan</strong>, Minister for PWD, in the presence of
              Hon'ble <strong>Thiru. Arcot N. Veeraswamy</strong>, Minister for Health and Electricity, Hon'ble{" "}
              <strong>Thiru K. Pitchandi</strong>, Minister for Housing, and <strong>Dr. G. Viswanathan</strong>,
              Chancellor, on 20th September 1998.
            </p>
            <p>
              SMV is also called <strong>'The Hexagon'</strong> due to its unique architecture. The building is in the
              shape of a hexagon, consisting of spacious classrooms and well-equipped labs, mostly{" "}
              <strong>Chemical and Biotechnology Labs</strong>.
            </p>
            <p>
              SMV houses the <strong>School of Bio-sciences and Technology (SBST)</strong>, as well as Catering and
              Hotel Management. An enormous spacious smart classroom adds a feather to its cap.
            </p>
          </div>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Building Information</CardTitle>
              <CardDescription>Key details about SMV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">East Campus, VIT Vellore</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    Classrooms: 60-80 seats
                    <br />
                    Laboratories: 30-40 seats
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <SquareFeet className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Architecture</p>
                  <p className="text-sm text-muted-foreground">
                    Hexagonal design with 4 floors
                    <br />
                    Spacious labs and classrooms
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <School className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Schools & Departments</p>
                  <p className="text-sm text-muted-foreground">
                    School of Bio-sciences and Technology (SBST)
                    <br />
                    Catering and Hotel Management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {smvEvents.map((event) => (
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
            {smvVenues.map((venue) => (
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
          <BuildingFloorPlan building="smv" />
        </TabsContent>
        <TabsContent value="facilities" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Biotechnology Labs</CardTitle>
                <CardDescription>Advanced research facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Medical Biotechnology Lab</span>
                    <span className="text-muted-foreground">853 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Plant Biotechnology Lab</span>
                    <span className="text-muted-foreground">377 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Microbial Molecular Biology Lab</span>
                    <span className="text-muted-foreground">869 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tissue Culture Lab</span>
                    <span className="text-muted-foreground">1395 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Classrooms</CardTitle>
                <CardDescription>Learning spaces</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Classroom SMV-101</span>
                    <span className="text-muted-foreground">863 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Classroom SMV-102</span>
                    <span className="text-muted-foreground">920 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Classroom SMV-104</span>
                    <span className="text-muted-foreground">705 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Specialized Labs</CardTitle>
                <CardDescription>Unique research facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Quantitative Biology Lab</span>
                    <span className="text-muted-foreground">732 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Medical Informatics Lab</span>
                    <span className="text-muted-foreground">168 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fermentation Lab</span>
                    <span className="text-muted-foreground">247 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Immunopathology Lab</span>
                    <span className="text-muted-foreground">282 sq. ft.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Advanced Research Facilities</CardTitle>
                <CardDescription>Cutting-edge equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Marine Biotechnology and Bio Products Lab</span>
                    <span className="text-muted-foreground">1263 sq. ft.</span>
                  </li>
                  <li className="flex justify-between">
                    <span>High Throughput Screening Lab</span>
                    <span className="text-muted-foreground">1854 sq. ft.</span>
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
              <CardDescription>Reserve a laboratory, classroom, or meeting space</CardDescription>
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
                      <option value="smv-101">Classroom SMV-101</option>
                      <option value="biotech-lab">Medical Biotechnology Lab</option>
                      <option value="tissue-culture">Tissue Culture Lab</option>
                      <option value="molecular-lab">Microbial Molecular Biology Lab</option>
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

const smvVenues = [
  {
    id: "smv-101",
    name: "Classroom SMV-101",
    type: "Classroom",
    location: "SMV First Floor",
    capacity: "80",
    area: "863 sq. ft.",
    facilities: "Projector, Audio System, Air Conditioning",
  },
  {
    id: "biotech-lab",
    name: "Medical Biotechnology Lab",
    type: "Laboratory",
    location: "SMV Second Floor",
    capacity: "30",
    area: "853 sq. ft.",
    facilities: "PCR Machines, Centrifuges, Spectrophotometers",
  },
  {
    id: "molecular-lab",
    name: "Microbial Molecular Biology Lab",
    type: "Laboratory",
    location: "SMV Second Floor",
    capacity: "30",
    area: "869 sq. ft.",
    facilities: "Microscopes, Incubators, Molecular Analysis Equipment",
  },
  {
    id: "tissue-culture",
    name: "Tissue Culture Lab",
    type: "Laboratory",
    location: "SMV Third Floor",
    capacity: "25",
    area: "1395 sq. ft.",
    facilities: "Laminar Flow Hoods, Incubators, Sterile Work Areas",
  },
  {
    id: "screening-lab",
    name: "High Throughput Screening Lab",
    type: "Laboratory",
    location: "SMV Third Floor",
    capacity: "35",
    area: "1854 sq. ft.",
    facilities: "Automated Screening Systems, Analysis Software, Robotics",
  },
  {
    id: "marine-biotech",
    name: "Marine Biotechnology Lab",
    type: "Laboratory",
    location: "SMV Third Floor",
    capacity: "30",
    area: "1263 sq. ft.",
    facilities: "Aquatic Systems, Analysis Equipment, Specialized Workstations",
  },
]

const smvEvents = [
  {
    id: "1",
    name: "Moonscribing 3.0",
    date: "March 26, 2025",
    venue: "SMV101",
  },
  {
    id: "2",
    name: "Patisserie 2.0",
    date: "March 27, 2025",
    venue: "SMV 312",
  },
  {
    id: "7",
    name: "Biotechnology Workshop Series",
    date: "January 15, 2025",
    venue: "SMV Biotechnology Lab",
  },
]

