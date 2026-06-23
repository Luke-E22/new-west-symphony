import type { Venue, VenueKey } from "./types";

/** The two community venues (§8d fixed values). */
export const VENUES: Record<VenueKey, Venue> = {
  to: {
    key: "to",
    name: "Bank of America Performing Arts Center",
    hall: "Fred Kavli Theatre",
    city: "Thousand Oaks",
    street: "2100 Thousand Oaks Blvd",
    region: "CA",
    postalCode: "91362",
    addressLine: "2100 Thousand Oaks Blvd, Thousand Oaks, CA 91362",
    parking:
      "$16 per vehicle in the on-site parking structure, steps from the doors. Arrive 30 minutes early for an easy night.",
    accessibility:
      "Wheelchair seating, assistive listening, and accessible restrooms throughout.",
  },
  cam: {
    key: "cam",
    name: "Rancho Campana Performing Arts Center",
    city: "Camarillo",
    street: "4235 Mar Vista Dr",
    region: "CA",
    postalCode: "93012",
    addressLine: "4235 Mar Vista Dr, Camarillo, CA 93012",
    parking:
      "Free lot parking on campus with a short, well-lit walk to the hall.",
    accessibility:
      "Step-free access, companion seating, and assistive listening devices on request.",
  },
};
