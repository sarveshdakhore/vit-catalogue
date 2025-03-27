"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

interface BuildingFloorPlanProps {
  building: string
}

export function BuildingFloorPlan({ building }: BuildingFloorPlanProps) {
  const [activeFloor, setActiveFloor] = useState("ground")
  const [searchQuery, setSearchQuery] = useState("")

  // Get the correct floor data based on the building
  const floorData = buildingFloorData[building] || {}
  const floors = Object.keys(floorData)

  // Filter rooms based on search query
  const filteredRooms =
    floorData[activeFloor]?.filter(
      (room) =>
        room.roomNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.department.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || []

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {floors.map((floor) => (
          <Button
            key={floor}
            variant={activeFloor === floor ? "default" : "outline"}
            onClick={() => setActiveFloor(floor)}
          >
            {floorLabels[floor]}
          </Button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search rooms, departments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No</TableHead>
                <TableHead>Room Name</TableHead>
                <TableHead className="hidden md:table-cell">Area (sqft)</TableHead>
                <TableHead className="hidden md:table-cell">Area (sqm)</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <TableRow key={room.roomNo}>
                    <TableCell className="font-medium">{room.roomNo}</TableCell>
                    <TableCell>{room.roomName}</TableCell>
                    <TableCell className="hidden md:table-cell">{room.areaSqft}</TableCell>
                    <TableCell className="hidden md:table-cell">{room.areaSqm}</TableCell>
                    <TableCell>{room.department}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No rooms found. Try a different search or floor.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

const floorLabels = {
  ground: "Ground Floor",
  first: "First Floor",
  second: "Second Floor",
  third: "Third Floor",
  fourth: "Fourth Floor",
  fifth: "Fifth Floor",
  sixth: "Sixth Floor",
  seventh: "Seventh Floor",
}

// Sample floor data for each building
const buildingFloorData = {
  tt: {
    ground: [
      { roomNo: "G01", roomName: "Chinese Language Centre", areaSqft: "683.41", areaSqm: "63.49", department: "SSL" },
      { roomNo: "G01", roomName: "French Language Centre", areaSqft: "376.63", areaSqm: "34.99", department: "SSL" },
      { roomNo: "G02", roomName: "Incubation Cells", areaSqft: "1064.67", areaSqm: "98.91", department: "TBI" },
      { roomNo: "G03", roomName: "Incubation Cells", areaSqft: "1021.18", areaSqm: "94.87", department: "TBI" },
      { roomNo: "G04", roomName: "Training Hall", areaSqft: "1036.14", areaSqm: "96.26", department: "TBI" },
      {
        roomNo: "G05",
        roomName: "Product Innovation Centre Bio Lab – I",
        areaSqft: "1039.69",
        areaSqm: "96.59",
        department: "TBI",
      },
      { roomNo: "G06", roomName: "Staff Toilets", areaSqft: "70.00", areaSqm: "6.50", department: "TBI" },
      { roomNo: "G07", roomName: "DTS Nidhi Prayas Centre", areaSqft: "519.79", areaSqm: "48.29", department: "TBI" },
    ],
    first: [
      { roomNo: "101", roomName: "PA Room", areaSqft: "50", areaSqm: "4.65", department: "CNRT" },
      { roomNo: "102", roomName: "Dean", areaSqft: "160", areaSqm: "14.86", department: "CNRT" },
      { roomNo: "103", roomName: "Conference Room", areaSqft: "100", areaSqm: "9.29", department: "CNRT" },
      { roomNo: "104", roomName: "CLASSROOM", areaSqft: "686.96", areaSqm: "63.82", department: "SELECT" },
      {
        roomNo: "105, 106",
        roomName: "Biochemical & Analytical Instrumentation Lab",
        areaSqft: "1768.85",
        areaSqm: "164.33",
        department: "SBST",
      },
      { roomNo: "107, 108", roomName: "Microbiology Lab", areaSqft: "1732.14", areaSqm: "160.92", department: "SBST" },
      {
        roomNo: "109, 110",
        roomName: "BIO MEDICAL GENETICS LAB",
        areaSqft: "1041.09",
        areaSqm: "96.72",
        department: "SBST",
      },
      { roomNo: "111", roomName: "Material Sciences Lab", areaSqft: "518.82", areaSqm: "48.20", department: "SAS" },
    ],
  },
  cdmm: {
    ground: [
      {
        roomNo: "G01",
        roomName: "High Resolution Mass Spectrometry Lab",
        areaSqft: "335",
        areaSqm: "31.15",
        department: "SAS",
      },
      { roomNo: "G02", roomName: "Cabin", areaSqft: "160", areaSqm: "14.91", department: "SAS" },
      { roomNo: "G03", roomName: "VSM Lab", areaSqft: "303", areaSqm: "28.17", department: "SAS" },
      { roomNo: "G05", roomName: "Single crystal XRD Lab", areaSqft: "327", areaSqm: "30.34", department: "SAS" },
      { roomNo: "G08", roomName: "High Performance Thin Layer", areaSqft: "253", areaSqm: "23.55", department: "SAS" },
      {
        roomNo: "G09",
        roomName: "Powder X-Ray Diffractometer Facility",
        areaSqft: "300",
        areaSqm: "27.83",
        department: "SAS",
      },
      { roomNo: "G10", roomName: "Electron Microscopy Lab", areaSqft: "308", areaSqm: "28.60", department: "CMCT" },
      {
        roomNo: "G06",
        roomName: "Centre of Excellence for Autonomous Vehicles Research",
        areaSqft: "713",
        areaSqm: "66.22",
        department: "ARC",
      },
      {
        roomNo: "G07",
        roomName: "EMC Wireless Test Chamber",
        areaSqft: "1275",
        areaSqm: "118.45",
        department: "SENSE",
      },
    ],
    first: [
      { roomNo: "101", roomName: "Call Office IPR", areaSqft: "322", areaSqm: "29.89", department: "IPR" },
      { roomNo: "102", roomName: "Toilet", areaSqft: "52", areaSqm: "4.80", department: "Common" },
      { roomNo: "103-107", roomName: "Class Rooms", areaSqft: "798", areaSqm: "74.14", department: "SCE" },
      { roomNo: "108", roomName: "Rest room", areaSqft: "51", areaSqm: "4.70", department: "Common" },
      {
        roomNo: "109",
        roomName: "Company Shine Software Training Center",
        areaSqft: "319",
        areaSqm: "29.67",
        department: "UHET",
      },
    ],
    second: [
      {
        roomNo: "201",
        roomName: "Ph.D. Scholars Sitting Place",
        areaSqft: "313",
        areaSqm: "29.11",
        department: "CDMM",
      },
      { roomNo: "202", roomName: "CDMM Director Cabin", areaSqft: "247", areaSqm: "22.97", department: "CDMM" },
      { roomNo: "203", roomName: "Conference Room", areaSqft: "449", areaSqm: "41.75", department: "CDMM" },
      { roomNo: "204", roomName: "Faculty Cabin", areaSqft: "233", areaSqm: "21.65", department: "CDMM" },
      { roomNo: "205", roomName: "GIS Lab", areaSqft: "916", areaSqm: "85.08", department: "CDMM" },
    ],
  },
  smv: {
    ground: [
      { roomNo: "G01", roomName: "Quantitative Biology Lab", areaSqft: "732", areaSqm: "68", department: "SBST" },
      { roomNo: "G01A", roomName: "Medical Informatics Lab", areaSqft: "168", areaSqm: "15.57", department: "SBST" },
      { roomNo: "G02", roomName: "Gents Toilet", areaSqft: "355", areaSqm: "32.95", department: "Common" },
      { roomNo: "G03", roomName: "Ladies Toilet", areaSqft: "355", areaSqm: "32.95", department: "Common" },
      { roomNo: "G04", roomName: "Staff Room", areaSqft: "239", areaSqm: "22.19", department: "SMBS" },
    ],
    first: [
      { roomNo: "101", roomName: "Class Room", areaSqft: "863", areaSqm: "80.19", department: "Common" },
      { roomNo: "102", roomName: "Class Room", areaSqft: "920", areaSqm: "85.48", department: "Common" },
      { roomNo: "103", roomName: "Staff Room", areaSqft: "439", areaSqm: "40.8", department: "SBST" },
      { roomNo: "104", roomName: "Class Room", areaSqft: "705", areaSqm: "65.52", department: "Common" },
    ],
    second: [
      {
        roomNo: "201",
        roomName: "Microbial Molecular Biology Lab",
        areaSqft: "869",
        areaSqm: "80.77",
        department: "SBST",
      },
      { roomNo: "202", roomName: "Fermentation Lab", areaSqft: "247", areaSqm: "22.96", department: "SMV" },
      { roomNo: "203", roomName: "Medical Biotechnology Lab", areaSqft: "853", areaSqm: "79.2", department: "SBST" },
      { roomNo: "204", roomName: "Plant Biotechnology Lab", areaSqft: "377", areaSqm: "35.01", department: "SBST" },
    ],
    third: [
      {
        roomNo: "240",
        roomName: "Marine Biotechnology and Bio Products Lab",
        areaSqft: "1263",
        areaSqm: "117.3",
        department: "SBST",
      },
      { roomNo: "241", roomName: "Immunopathology Lab", areaSqft: "282", areaSqm: "26.24", department: "SBST" },
      { roomNo: "242", roomName: "Tissue Culture Lab", areaSqft: "1395", areaSqm: "129.64", department: "SBST" },
      {
        roomNo: "243",
        roomName: "High Throughput Screening Lab",
        areaSqft: "1854",
        areaSqm: "172.2",
        department: "SBST",
      },
    ],
  },
  gdn: {
    ground: [
      { roomNo: "G01", roomName: "Head of the Department", areaSqft: "710", areaSqm: "66.00", department: "SMEC" },
      {
        roomNo: "G02",
        roomName: "Centre of Excellence in Additive Manufacture",
        areaSqft: "4803",
        areaSqm: "446.23",
        department: "SMEC",
      },
      { roomNo: "G03", roomName: "Welding Shop", areaSqft: "1745", areaSqm: "162.11", department: "SMEC" },
    ],
    first: [
      { roomNo: "101", roomName: "Staff Room", areaSqft: "47", areaSqm: "4.32", department: "SMEC" },
      { roomNo: "102", roomName: "Staff Room", areaSqft: "61", areaSqm: "5.68", department: "SMEC" },
      { roomNo: "103", roomName: "Staff Room", areaSqft: "61", areaSqm: "5.68", department: "SMEC" },
    ],
  },
}

