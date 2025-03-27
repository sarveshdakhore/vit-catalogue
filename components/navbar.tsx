"use client"

import React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">VIT</span>
          </div>
          <span className="font-bold text-xl hidden md:inline-block">Infrastructure Catalogue</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Buildings</NavigationMenuTrigger>
                                <NavigationMenuContent>
                  <ul className="flex flex-col w-[320px] gap-3 p-4 max-w-[calc(100vw-2rem)]">
                    {buildingItems.map((building) => (
                      <ListItem key={building.title} title={building.title} href={building.href}>
                        {building.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/venues" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Venues</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/events" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Events</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-background border-b">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="px-4 py-2 text-sm font-medium">Buildings</div>
            <div className="pl-8 flex flex-col space-y-2">
              {buildingItems.map((building) => (
                <Link
                  key={building.title}
                  href={building.href}
                  className="px-4 py-1 text-sm rounded-md hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {building.title}
                </Link>
              ))}
            </div>
            <Link
              href="/venues"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Venues
            </Link>
            <Link
              href="/events"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

const buildingItems = [
  {
    title: "Technology Tower (TT)",
    href: "/buildings/tt",
    description: "A 7-floor architectural marvel housing various schools and research centers.",
  },
  {
    title: "Centre of Disaster Mitigation (CDMM)",
    href: "/buildings/cdmm",
    description: "The first center set up in India for disaster mitigation and management.",
  },
  {
    title: "Sri M Vishveshwaraiah (SMV)",
    href: "/buildings/smv",
    description: "Known as 'The Hexagon', houses biotechnology labs and spacious classrooms.",
  },
  {
    title: "G.D. Naidu Block (GDN)",
    href: "/buildings/gdn",
    description: "Workshop cum Laboratory building with various schools and departments.",
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

