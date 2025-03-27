import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Filter } from "lucide-react"

export default function BuildingsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Campus Buildings</h1>
          <p className="text-muted-foreground">
            Explore all buildings and facilities across VIT Vellore campus
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search buildings by name or function..."
              className="w-full bg-background py-2 pl-8 pr-4 text-sm ring-1 ring-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Building Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {categories.map((category) => (
            <Button key={category} variant="outline" className="h-auto py-2 justify-start">
              {category}
            </Button>
          ))}
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {buildings.map((building) => (
            <Link href={building.href} key={building.id}>
              <Card className="h-full transition-all hover:shadow-md">
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
    </div>
  )
}

const categories = [
  "Academic",
  "Administration",
  "Labs",
  "Hostels",
  "Sports",
  "Cafeteria"
]

const buildings = [
  {
    id: "tt",
    name: "Technology Tower (TT)",
    description: "A 7-floor architectural marvel housing various schools and research centers.",
    image: "/placeholder.svg?height=300&width=500",
    location: "Central Campus",
    href: "/buildings/tt",
    category: "Academic"
  },
  {
    id: "cdmm",
    name: "Centre of Disaster Mitigation (CDMM)",
    description: "The first center set up in India for disaster mitigation and management.",
    image: "/placeholder.svg?height=300&width=500",
    location: "North Campus",
    href: "/buildings/cdmm",
    category: "Academic"
  },
  {
    id: "smv",
    name: "Sri M Vishveshwaraiah (SMV)",
    description: "Known as 'The Hexagon', houses biotechnology labs and spacious classrooms.",
    image: "/placeholder.svg?height=300&width=500",
    location: "East Campus",
    href: "/buildings/smv",
    category: "Academic"
  },
  {
    id: "gdn",
    name: "G.D. Naidu Block (GDN)",
    description: "Workshop cum Laboratory building with various schools and departments.",
    image: "/placeholder.svg?height=300&width=500",
    location: "West Campus",
    href: "/buildings/gdn",
    category: "Labs"
  },
  {
    id: "mb",
    name: "Main Building (MB)",
    description: "The original administrative hub housing key offices and departments.",
    image: "/placeholder.svg?height=300&width=500",
    location: "Central Campus",
    href: "/buildings/mb",
    category: "Administration"
  },
  {
    id: "slh",
    name: "Silver Jubilee Hall (SJH)",
    description: "A modern auditorium with seating capacity of 1500 for university events.",
    image: "/placeholder.svg?height=300&width=500",
    location: "South Campus",
    href: "/buildings/slh",
    category: "Academic"
  },
  {
    id: "mh",
    name: "Men's Hostel (MH)",
    description: "Residential blocks for male students with various amenities.",
    image: "/placeholder.svg?height=300&width=500",
    location: "North Campus",
    href: "/buildings/mh",
    category: "Hostels"
  },
  {
    id: "library",
    name: "Central Library",
    description: "State-of-the-art library with extensive collection of books and digital resources.",
    image: "/placeholder.svg?height=300&width=500",
    location: "Central Campus",
    href: "/buildings/library",
    category: "Academic"
  }
]