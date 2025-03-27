import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Calendar, Building } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  VIT Vellore Infrastructure Catalogue
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Explore our campus buildings, venues, and facilities. Find information about auditoriums, seminar
                  halls, labs, and more.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/buildings">
                  <Button size="lg" className="gap-1">
                    <Building className="h-4 w-4" />
                    Explore Buildings
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    View Events
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="VIT Campus"
                width={1280}
                height={720}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find What You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Quickly search for buildings, venues, or upcoming events
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search buildings, venues, events..."
                  className="w-full bg-background py-2 pl-8 pr-4 text-sm ring-1 ring-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Buildings Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Buildings</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our main campus buildings and their facilities
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {buildings.map((building) => (
              <Link href={building.href} key={building.id}>
                <Card className="h-full building-card">
                  <CardHeader className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                        src={building.image || "/placeholder.svg"}
                        alt={building.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-xl mb-2">{building.name}</CardTitle>
                    <CardDescription>{building.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {building.location}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Upcoming Events</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out the latest workshops, seminars, and events happening on campus
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {events.map((event) => (
              <Card key={event.id} className="h-full">
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{event.description}</p>
                  <div className="flex items-center mt-4 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.venue}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/events/${event.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/events">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const buildings = [
  {
    id: "tt",
    name: "Technology Tower (TT)",
    description: "A 7-floor architectural marvel housing various schools and research centers.",
    image: "/placeholder.svg?height=300&width=500",
    location: "Central Campus",
    href: "/buildings/tt",
  },
  {
    id: "cdmm",
    name: "Centre of Disaster Mitigation (CDMM)",
    description: "The first center set up in India for disaster mitigation and management.",
    image: "/placeholder.svg?height=300&width=500",
    location: "North Campus",
    href: "/buildings/cdmm",
  },
  {
    id: "smv",
    name: "Sri M Vishveshwaraiah (SMV)",
    description: "Known as 'The Hexagon', houses biotechnology labs and spacious classrooms.",
    image: "/placeholder.svg?height=300&width=500",
    location: "East Campus",
    href: "/buildings/smv",
  },
  {
    id: "gdn",
    name: "G.D. Naidu Block (GDN)",
    description: "Workshop cum Laboratory building with various schools and departments.",
    image: "/placeholder.svg?height=300&width=500",
    location: "West Campus",
    href: "/buildings/gdn",
  },
]

const events = [
  {
    id: "1",
    name: "Moonscribing 3.0",
    date: "March 26, 2025",
    description: "A creative writing workshop for students interested in poetry and prose.",
    venue: "SMV101",
  },
  {
    id: "2",
    name: "Patisserie 2.0",
    date: "March 27, 2025",
    description: "Learn the art of French pastry making with expert chefs.",
    venue: "SMV 312",
  },
  {
    id: "3",
    name: "E-Summit 2025",
    date: "March 6, 2025",
    description: "Annual entrepreneurship summit featuring speakers from leading startups.",
    venue: "TT Auditorium",
  },
]

