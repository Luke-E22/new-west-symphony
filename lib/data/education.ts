import type { EducationDetail } from "./types";

/** Music Education overview (recreated from the live site, §education). */
export const EDUCATION_OVERVIEW =
  "New West Symphony works year-round to bring music education into the lives of young people across Ventura County and the Conejo Valley — from elementary school through college. Through interactive live performances and hands-on programs, we aim to inspire a lifelong passion for music, reaching thousands of students every year.";

/**
 * Detailed program write-ups + photos, recreated and summarized from the live
 * site's program pages. `key` doubles as the in-page anchor id and icon key.
 */
export const EDUCATION_DETAIL: EducationDetail[] = [
  {
    key: "symphonic-adventures",
    name: "Symphonic Adventures",
    tagline: "In schools",
    summary: [
      "Symphonic Adventures is our flagship education program — a live, 50-minute interactive concert for elementary students that gives many of them their very first experience of classical music. By introducing children to the orchestra, its conductor, and the elements of music, it sets out to spark a lifelong appreciation.",
      "Led by GRAMMY-winning Music Director Michael Christie, the annual concert has been presented by New West Symphony for three decades, pairing beloved repertoire with guest artists, narration, and more.",
    ],
    photo: "/assets/photos/edu-symphonic.jpg",
  },
  {
    key: "laby-harmony-project",
    name: "Laby Harmony Project",
    tagline: "After school",
    summary: [
      "The Laby Harmony Project provides tuition-free musical opportunity to children in underserved communities, currently serving more than 150 students in the heart of Ventura's Westside. It builds pathways to success through a multi-year continuum of rigorous after-school training, in partnership with students, families, and local supporters.",
      "Thanks to generous donors and volunteers, the program now reaches over 150 students from eight schools with ten teaching artists — and a growing waiting list of children eager to join.",
    ],
    photo: "/assets/photos/edu-harmony.jpg",
  },
  {
    key: "music-van",
    name: "Music Van",
    tagline: "On the road",
    summary: [
      "The Music Van is a nationally acclaimed “musical petting zoo” that brings orchestral instruments directly into 3rd–5th grade classrooms for a hands-on experience. Available to elementary schools all year, it has introduced thousands of students across the region to instruments from the string, brass, wind, and percussion families — and to the physics of musical sound.",
      "School visits include a short training workshop for volunteers on the care and handling of the instruments. The Music Van is supported by the Rotary Club of Thousand Oaks, with the vehicle itself made possible by Swickard Auto Group and Signarama of Camarillo.",
    ],
    photo: "/assets/photos/music-van.jpg",
  },
  {
    key: "quick-bowman",
    name: "Quick Bowman Piano Competition",
    tagline: "Young artists",
    summary: [
      "The Quick Bowman Piano Competition and Recital are held annually to give local youth the chance to perform before judges and be recognized for their artistry. Winners receive cash prizes, recital performances, and masterclasses.",
      "Created by Henry and LaReine Quick in 1990 out of LaReine's love of the piano, the competition is held in memory of Henry and LaReine Quick and Jesse Bowman. After a 21-year legacy in Sedona, Arizona, the family partnered with New West Symphony to continue it in California.",
    ],
    photo: "/assets/photos/edu-piano.jpg",
  },
  {
    key: "intermission-insights",
    name: "Intermission Insights",
    tagline: "For everyone",
    summary: [
      "Intermission Insights opens up the question of what runs through a performer's mind standing before a full orchestra and a rapt audience. At each concert, Artistic and Music Director Michael Christie leads a relaxed 10-minute Q&A with the featured artists.",
      "The conversations invite audience members in to learn more about the very human experience of making music in the moment — a free, welcoming addition to every concert.",
    ],
    photo: "/assets/photos/edu-intermission.jpg",
  },
];
