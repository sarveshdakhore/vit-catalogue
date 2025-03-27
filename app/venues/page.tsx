"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Users, SquareIcon as SquareFeet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter venues based on search query, building filter, and type filter
  const filteredVenues = allVenues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.building.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBuilding =
      buildingFilter === "all" || venue.building.toLowerCase().includes(buildingFilter.toLowerCase())

    const matchesType = typeFilter === "all" || venue.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesBuilding && matchesType
  })

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-6">Venues & Facilities</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search venues..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
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
          <div className="flex items-center gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="auditorium">Auditorium</SelectItem>
                <SelectItem value="conference">Conference Hall</SelectItem>
                <SelectItem value="classroom">Classroom</SelectItem>
                <SelectItem value="laboratory">Laboratory</SelectItem>
                <SelectItem value="seminar">Seminar Hall</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="auditoriums">Auditoriums</TabsTrigger>
          <TabsTrigger value="conference">Conference Halls</TabsTrigger>
          <TabsTrigger value="labs">Laboratories</TabsTrigger>
          <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No venues found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="auditoriums">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.filter((venue) => venue.type.toLowerCase() === "auditorium").length > 0 ? (
              filteredVenues
                .filter((venue) => venue.type.toLowerCase() === "auditorium")
                .map((venue) => <VenueCard key={venue.id} venue={venue} />)
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No auditoriums found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="conference">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.filter((venue) => venue.type.toLowerCase() === "conference").length > 0 ? (
              filteredVenues
                .filter((venue) => venue.type.toLowerCase() === "conference")
                .map((venue) => <VenueCard key={venue.id} venue={venue} />)
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No conference halls found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="labs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.filter((venue) => venue.type.toLowerCase() === "laboratory").length > 0 ? (
              filteredVenues
                .filter((venue) => venue.type.toLowerCase() === "laboratory")
                .map((venue) => <VenueCard key={venue.id} venue={venue} />)
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No laboratories found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="classrooms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.filter((venue) => venue.type.toLowerCase() === "classroom").length > 0 ? (
              filteredVenues
                .filter((venue) => venue.type.toLowerCase() === "classroom")
                .map((venue) => <VenueCard key={venue.id} venue={venue} />)
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No classrooms found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface VenueCardProps {
  venue: Venue
}

function VenueCard({ venue }: VenueCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={venue.image || "/placeholder.svg?height=300&width=500"}
          alt={venue.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">{venue.type}</Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{venue.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {venue.building} • {venue.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{venue.description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Capacity: {venue.capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <SquareFeet className="h-4 w-4 text-muted-foreground" />
            <span>Area: {venue.area}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/venues/${venue.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

interface Venue {
  id: string
  name: string
  type: string
  building: string
  location: string
  capacity: string
  area: string
  description: string
  facilities: string
  image?: string
}

const allVenues: Venue[] = [
  {
    id: "ambedkar",
    name: "Dr. B.R Ambedkar Auditorium",
    type: "Auditorium",
    building: "TT",
    location: "Ground Floor",
    capacity: "198",
    area: "2447 sq. ft.",
    description: "A state-of-the-art auditorium for conferences, seminars, and cultural events.",
    facilities: "Projector, Sound System, Air Conditioning",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "kamaraj",
    name: "Kamaraj Auditorium",
    type: "Auditorium",
    building: "TT",
    location: "First Floor",
    capacity: "128",
    area: "2447 sq. ft.",
    description: "Modern auditorium suitable for academic presentations and guest lectures.",
    facilities: "Projector, Sound System, Air Conditioning",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "tbi-conf",
    name: "Conference Hall @ TBI",
    type: "Conference",
    building: "TT",
    location: "Third Floor",
    capacity: "20",
    area: "454 sq. ft.",
    description: "Intimate conference space for business meetings and small gatherings.",
    facilities: "Projector, Video Conferencing, Whiteboard",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "tifac-conf",
    name: "Conference Hall @ TIFAC",
    type: "Conference",
    building: "TT",
    location: "Fourth Floor",
    capacity: "14",
    area: "300 sq. ft.",
    description: "Compact conference room for focused discussions and planning sessions.",
    facilities: "Projector, Video Conferencing, Whiteboard",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "cdmm-conf",
    name: "CDMM Conference Room",
    type: "Conference",
    building: "CDMM",
    location: "Second Floor",
    capacity: "30",
    area: "449 sq. ft.",
    description: "Specialized conference room for disaster management planning and coordination.",
    facilities: "Smart Board, Video Conferencing, Air Conditioning",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "gis-lab",
    name: "GIS Lab",
    type: "Laboratory",
    building: "CDMM",
    location: "Second Floor",
    capacity: "40",
    area: "916 sq. ft.",
    description: "Advanced Geographic Information Systems laboratory for spatial analysis and mapping.",
    facilities: "High-end Workstations, GIS Software, Large Format Printers",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "bio-lab",
    name: "Biochemical & Analytical Lab",
    type: "Laboratory",
    building: "TT",
    location: "First Floor",
    capacity: "40",
    area: "1768 sq. ft.",
    description: "Comprehensive laboratory for biochemical analysis and research.",
    facilities: "Lab Equipment, Workstations, Safety Gear",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "micro-lab",
    name: "Microbiology Lab",
    type: "Laboratory",
    building: "TT",
    location: "First Floor",
    capacity: "40",
    area: "1732 sq. ft.",
    description: "Specialized laboratory for microbiological studies and research.",
    facilities: "Microscopes, Incubators, Sterilization Equipment",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "tt-104",
    name: "Classroom TT-104",
    type: "Classroom",
    building: "TT",
    location: "First Floor",
    capacity: "60",
    area: "686 sq. ft.",
    description: "Modern classroom equipped with the latest teaching technology.",
    facilities: "Projector, Smart Board, Air Conditioning",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "smv-101",
    name: "Classroom SMV-101",
    type: "Classroom",
    building: "SMV",
    location: "First Floor",
    capacity: "80",
    area: "863 sq. ft.",
    description: "Spacious classroom in the hexagonal SMV building.",
    facilities: "Projector, Audio System, Air Conditioning",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "biotech-lab",
    name: "Medical Biotechnology Lab",
    type: "Laboratory",
    building: "SMV",
    location: "Second Floor",
    capacity: "30",
    area: "853 sq. ft.",
    description: "Specialized laboratory for medical biotechnology research and experiments.",
    facilities: "PCR Machines, Centrifuges, Spectrophotometers",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "welding-shop",
    name: "Welding Shop",
    type: "Laboratory",
    building: "GDN",
    location: "Ground Floor",
    capacity: "30",
    area: "1745 sq. ft.",
    description: "Industrial workshop for welding training and fabrication projects.",
    facilities: "Welding Equipment, Safety Gear, Ventilation Systems",
    image: "/placeholder.svg?height=300&width=500",
  },
]

