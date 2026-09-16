import type { ChorusInfo, OrchestraSection, StaffMember } from "./types";

/**
 * Music Director, orchestra, staff, and chorus — recreated from the live
 * New West Symphony website (about/orchestra-members, about/staff,
 * michael-christie, new-west-symphony-chorus-wyant-morton).
 */

export const CHRISTIE = {
  name: "Michael Christie",
  title: "Artistic & Music Director",
  portrait: "/assets/photos/christie-portrait.jpg", // official NWS B&W portrait
  bio: [
    "GRAMMY® award-winning conductor Michael Christie is an innovative conductor, at home in both the symphonic and opera worlds, who is focused on making the audience experience entertaining, enlightening and enriching. The New York Times reports, “Michael Christie is a director open to adventure and challenge.”",
    "Michael Christie is the Artistic and Music Director of the New West Symphony, serving the Ventura County region in Southern California. Recently, he led the world premiere of Derrick Skye’s Amalgamation for violin and orchestra — commissioned for concertmaster Alyssa Park by the New West Symphony — and presented Dvořák’s “New World” Symphony accompanied by stunning drone images by photo historian Joseph Sohm.",
    "Christie was recently appointed the Ruth Blaustein Rosenberg Artistic Director of Ensembles at the Peabody Conservatory, leading the programming and direction of the Conservatory’s instrumental and vocal ensembles beginning in fall 2026. He made his Metropolitan Opera debut leading performances of Mason Bates’ The Amazing Adventures of Kavalier & Clay in 2026.",
    "Michael Christie won a 2019 GRAMMY® award (Best Opera Recording) for the world premiere recording of Mason Bates’ The (R)evolution of Steve Jobs with The Santa Fe Opera (PENTATONE).",
  ],
};

/**
 * Interim CEO — from NWS's supplied bio (Sept 2026). The doc ships a SHORT and
 * a LONG bio: `intro` is the short bio's opener (always visible on /about) and
 * `bioMore` is the long bio minus its first paragraph, which restates the
 * intro — together they read as one continuous text behind "Learn more".
 * Headshot is the supplied 358×411 original; display it ≤180px wide so it
 * stays sharp on retina screens.
 */
export const KIBLER_VERMAAS = {
  name: "Elsje Kibler-Vermaas, MBA",
  title: "Interim Chief Executive Officer",
  portrait: "/assets/photos/kibler-vermaas-portrait.jpg",
  intro:
    "Elsje Kibler-Vermaas is an orchestra executive and music education leader with more than two decades of experience in the arts. She currently serves as Interim CEO of New West Symphony.",
  bioMore: [
    "Prior to joining New West Symphony, Kibler-Vermaas spent nearly a decade on the senior leadership team of the Los Angeles Philharmonic as Vice President of Learning. In that role, she led the LA Phil’s music education and community learning initiatives, including YOLA (Youth Orchestra Los Angeles), and contributed to the artistic development of the orchestra’s Youth and Family Concerts. She also oversaw the planning, development, and opening of the Judith and Thomas L. Beckmen YOLA Center, designed by architect Frank Gehry.",
    "Her career has spanned orchestras, higher education, museums, and international cultural organizations. She previously directed the Los Angeles campus of Longy School of Music of Bard College and has held positions with the J. Paul Getty Museum, the Royal Concertgebouw in Amsterdam, and the Hartford Symphony Orchestra. Through her consulting practice, EKV ARTS, she advises arts, cultural, and educational organizations on strategy, leadership, governance, fundraising, and organizational development. Her broader work has included national and international initiatives, including youth music education and facility planning in Abu Dhabi.",
    "A frequent speaker and guest lecturer on music education, arts leadership, and the role of cultural organizations in their communities, Kibler-Vermaas is also a classically trained pianist and music educator. Originally from the Netherlands, she holds a degree in Music Education from the Utrecht Conservatory and an Executive MBA in Arts & Innovation from the Global Leaders Institute.",
  ],
};

export const ORCHESTRA_SECTIONS: OrchestraSection[] = [
  {
    section: "Violin I",
    members: [
      { name: "Alyssa Park", role: "Concertmaster" },
      { name: "Chloé Tardif", role: "First Associate Concertmaster" },
      { name: "Yaeri Choi", role: "Assistant Concertmaster" },
      { name: "Lisa Dondlinger" },
      { name: "Tamsen Beseke" },
      { name: "Luke Santonastaso" },
      { name: "Yin Jiang" },
      { name: "Nelly Kovalev" },
      { name: "Ashoka Thiagarajan" },
      { name: "Ji Eun Hwang" },
      { name: "Michelle Sheehy" },
    ],
  },
  {
    section: "Violin II",
    members: [
      { name: "Ina Veli", role: "Principal" },
      { name: "Haesol Lee", role: "Assistant Principal" },
      { name: "Dianne Rammon" },
      { name: "Nan Ying" },
      { name: "Sheng-Ching Hsu" },
      { name: "Anna Corcoran" },
      { name: "Jen Choi Fischer" },
    ],
  },
  {
    section: "Viola",
    members: [
      { name: "Phillip Triggs", role: "Principal" },
      { name: "Diane Gilbert", role: "Assistant Principal" },
      { name: "Alice Ping" },
      { name: "Josephine Moerschel" },
      { name: "Aaron Oltman" },
      { name: "Zachary Hamilton" },
      { name: "Damon Zavala" },
      { name: "Colleen Sugata" },
    ],
  },
  {
    section: "Cello",
    members: [
      { name: "Youna Choi", role: "Principal" },
      { name: "Wendy Velasco", role: "Assistant Principal" },
      { name: "Paula Fehrenbach" },
      { name: "Pamela de Almeida" },
      { name: "Madelynn Bolin" },
      { name: "Yun Han" },
      { name: "Juan-Salvador Carrasco" },
      { name: "Madlen Sarkissian" },
    ],
  },
  {
    section: "Bass",
    members: [
      { name: "Sukyung Chun", role: "Principal" },
      { name: "Barry Newton", role: "Assistant Principal" },
      { name: "Jeff Bandy" },
      { name: "Nicolas Philippon" },
      { name: "Thomas B. Harte, Jr." },
      { name: "Mark D. Wallace" },
    ],
  },
  {
    section: "Flute",
    members: [
      { name: "Paul Fried", role: "Principal" },
      { name: "Carol Lockart" },
    ],
  },
  {
    section: "Oboe",
    members: [
      { name: "Lara Wickes", role: "Principal" },
      { name: "Fredric Beerstein" },
    ],
  },
  {
    section: "Clarinet",
    members: [
      { name: "Joshua Ranz", role: "Principal" },
      { name: "Nancy Mathison" },
    ],
  },
  {
    section: "Bassoon",
    members: [
      { name: "Duncan Massey", role: "Principal" },
      { name: "William Wood" },
    ],
  },
  {
    section: "Horn",
    members: [
      { name: "James Thatcher", role: "Principal" },
      { name: "Jenny Kim", role: "Assistant Principal" },
      { name: "Jon Titmus" },
    ],
  },
  {
    section: "Trumpet",
    members: [
      { name: "James W. Grinta", role: "Principal" },
      { name: "David Etterbeek" },
    ],
  },
  {
    section: "Trombone",
    members: [
      { name: "Hiram Rodriguez", role: "Principal" },
      { name: "Brad Close" },
    ],
  },
  {
    section: "Tuba",
    members: [{ name: "P. Blake Cooper", role: "Principal" }],
  },
  {
    section: "Percussion",
    members: [{ name: "Marie Matson", role: "Principal" }],
  },
];

/** Orchestra operations staff listed alongside the roster. */
export const ORCHESTRA_OPERATIONS: StaffMember[] = [
  { name: "Gary Rautenberg", title: "Librarian & Stage Manager" },
  { name: "Brady Steel", title: "Personnel Manager" },
];

export const STAFF: StaffMember[] = [
  { name: "Elsje Kibler-Vermaas", title: "Interim Chief Executive Officer" },
  { name: "Sue McDonald", title: "Development Services Manager" },
  { name: "Patricia Jones", title: "Director of Special Projects" },
  { name: "Loliepop Mena-Hamilton", title: "Patron Services Manager" },
  { name: "Hayles King", title: "Harmony Project Manager" },
  { name: "Gary Rautenberg", title: "Librarian, Stage Manager" },
  { name: "Brady Steel", title: "Personnel Manager" },
  { name: "Jason Budow", title: "Lead Graphic Designer / Creative Director" },
];

export const CHORUS: ChorusInfo = {
  director: "Dr. Wyant Morton",
  directorTitle: "Chorus Director",
  description: [
    "The New West Symphony Chorus is a group of dedicated, skilled volunteer members who make performances of choral works for New West Symphony possible. Chorus members go through a competitive audition, then rehearse and perform throughout the season.",
    "The New West Symphony Chorus has been led by Chorus Director Dr. Wyant Morton since 2023.",
    "“Having a Symphony Chorus as part of the New West Symphony family is a true jewel in our artistic crown. New West Symphony is proud to create a new top chorus serving our region under the leadership of Dr. Wyant Morton,” says Artistic and Music Director Michael Christie.",
  ],
};
