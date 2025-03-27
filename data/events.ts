// Define the Event type
export interface Event {
  id: string
  name: string
  date: string
  description: string
  venue: string
  category?: string
  capacity?: string
  time?: string
  image?: string
}

// Export the events data
export const allEvents: Event[] = [
  {
    id: "1",
    name: "Moonscribing 3.0",
    date: "March 26, 2025",
    description: "A creative writing workshop for students interested in poetry and prose.",
    venue: "SMV101",
    category: "Workshop",
    capacity: "50",
    time: "2:00 PM - 5:00 PM",
  },
  {
    id: "2",
    name: "Patisserie 2.0",
    date: "March 27, 2025",
    description: "Learn the art of French pastry making with expert chefs.",
    venue: "SMV 312",
    category: "Workshop",
    capacity: "30",
    time: "10:00 AM - 1:00 PM",
  },
  {
    id: "3",
    name: "E-Summit 2025",
    date: "March 6, 2025",
    description: "Annual entrepreneurship summit featuring speakers from leading startups.",
    venue: "TT Auditorium",
    category: "Conference",
    capacity: "198",
    time: "9:00 AM - 6:00 PM",
  },
  {
    id: "4",
    name: "Yantra'25",
    date: "February 7, 2025",
    description: "Technical symposium showcasing innovative engineering projects.",
    venue: "CDMM Conference Room",
    category: "Symposium",
    capacity: "100",
    time: "10:00 AM - 4:00 PM",
  },
  {
    id: "5",
    name: "AI Research Symposium",
    date: "April 12, 2025",
    description: "Showcase of cutting-edge research in artificial intelligence and machine learning.",
    venue: "Conference Hall @ TBI",
    category: "Symposium",
    capacity: "20",
    time: "11:00 AM - 3:00 PM",
  },
  {
    id: "6",
    name: "International Conference on Nanotechnology",
    date: "May 15, 2025",
    description: "Global conference on advancements in nanotechnology research and applications.",
    venue: "Kamaraj Auditorium",
    category: "Conference",
    capacity: "128",
    time: "9:00 AM - 5:00 PM",
  },
  {
    id: "7",
    name: "Biotechnology Workshop Series",
    date: "January 15, 2025",
    description: "Hands-on workshop on advanced biotechnology techniques and methodologies.",
    venue: "SMV Biotechnology Lab",
    category: "Workshop",
    capacity: "40",
    time: "10:00 AM - 4:00 PM",
  },
  {
    id: "8",
    name: "Disaster Management Seminar",
    date: "December 10, 2024",
    description: "Seminar on disaster preparedness and mitigation strategies.",
    venue: "CDMM GIS Lab",
    category: "Seminar",
    capacity: "60",
    time: "10:00 AM - 1:00 PM",
  },
  {
    id: "9",
    name: "Manufacturing Innovation Expo",
    date: "November 5, 2024",
    description: "Exhibition showcasing innovations in manufacturing technologies.",
    venue: "GDN Workshop",
    category: "Exhibition",
    capacity: "150",
    time: "9:00 AM - 4:00 PM",
  },
  {
    id: "10",
    name: "GIS Workshop for Disaster Planning",
    date: "April 20, 2025",
    description: "Hands-on workshop on using GIS for disaster planning and management.",
    venue: "CDMM GIS Lab",
    category: "Workshop",
    capacity: "40",
    time: "9:00 AM - 3:00 PM",
  },
]

