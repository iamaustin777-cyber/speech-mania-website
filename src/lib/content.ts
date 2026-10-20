// All site copy lives here. Source of truth: the old site's six pages,
// carried over word for word. Don't invent new facts, names or numbers.

export type Img = { src: string; alt: string; w: number; h: number };

const event = (n: number, alt: string, portrait = false): Img => ({
  src: `/images/event-${n}.jpg`,
  alt,
  w: portrait ? 1108 : 1478,
  h: portrait ? 1478 : 1108,
});

export const images = {
  logo: { src: "/images/logo-speech-mania-transparent.png", alt: "Speech Mania Logo", w: 900, h: 384 },
  // Hero is relit by the WebGL stage light. Official White House photo (public domain):
  // https://commons.wikimedia.org/wiki/File:Barack_Obama_at_Cairo_University.jpg
  // TODO: the White House attached a usage note to its photos (no manipulation, no use that
  // suggests endorsement). Copyright allows reuse; confirm the team accepts that risk.
  // `focus` is where the speaker's face is in the photo (0-1, from top-left).
  hero: {
    src: "/images/hero-obama-cairo-2009.jpg",
    alt: "Barack Obama speaking at Cairo University, 2009",
    w: 3200,
    h: 2134,
    focus: [0.476, 0.62] as [number, number],
    frame: {
      desktop: { zoom: 1.7, anchor: [0.72, 0.42] as [number, number] },
      mobile: { zoom: 2.5, anchor: [0.5, 0.23] as [number, number] },
    },
    credit: "Barack Obama at Cairo University, 2009. Official White House photo by Pete Souza, public domain.",
  },

  tipscHome: event(45, "TIPSC Competition"),
  tipscPoster: {
    src: "/images/tipsc-poster.png",
    alt: "TIPSC 2025 - Thailand Individual Public Speaking Competition",
    w: 4000,
    h: 2250,
  },
  aboutTeam: event(57, "Speech Mania team and students", true),
  aboutWorkshop: event(25, "Students in workshop"),
  competition: event(47, "Competition"),
  workshop1: event(5, "Speech Mania workshop", true),
  workshop2: event(35, "Speech Mania workshop"),
  training: event(28, "Workshop"),
};

// Remaining event photos for the Impact gallery.
export const gallery: Img[] = [
  event(1, "Event photo"),
  event(10, "Event photo"),
  event(51, "Event photo", true),
  event(20, "Event photo"),
  event(44, "Event photo"),
  event(27, "Event photo"),
  event(30, "Event photo"),
  event(60, "Event photo"),
];

// TODO: confirm contact details — the old footer listed info@speechmania.org /
// +66 (0) 123 456 789, the old Contact page listed the values below.
export const contact = {
  email: "speechmaniaofficial@gmail.com",
  phone: "+66 0956491999",
  phoneNote: "(currently unavailable)",
  location: "Bangkok, Thailand",
  hours: [
    ["Monday - Friday", "9:00 AM - 6:00 PM"],
    ["Saturday", "10:00 AM - 4:00 PM"],
    ["Sunday", "Closed"],
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export const REGISTER_HREF = "/get-involved#register";

export const footer = {
  tagline:
    "Public speaking and leadership programs for students in Thailand and Southeast Asia.",
  quickLinks: [
    { href: "/about", label: "About Us" },
    { href: "/programs", label: "Programs" },
    { href: "/impact", label: "Impact & Achievements" },
    { href: "/contact", label: "Contact" },
  ],
  getInvolved: [
    { href: REGISTER_HREF, label: "Join a Workshop" },
    { href: "/contact", label: "Partner With Us" },
    { href: "/get-involved#sponsor", label: "Become a Sponsor" },
    { href: "/get-involved#resources", label: "Free Resources" },
  ],
  copyright: "© 2025 Speech Mania. All rights reserved.",
  // TODO: add real Privacy Policy / Terms of Service pages.
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

// A stat: numeric value is animated, suffix is appended as-is.
export type StatIcon = "school" | "globe" | "money" | "partners" | "students" | "trophy" | "heart" | "workshop";
export type Stat = { value: number; suffix?: string; label: string; icon?: StatIcon };

export const home = {
  hero: {
    line1: "Find your voice.",
    line2: "Shape your future.",
    body: "A youth-led group running public speaking competitions, workshops and Thailand's national team, for students across Southeast Asia.",
    // Most recent competition and results, shown on the first screen.
    recent: [
      {
        event: "WIDPSC 2025",
        where: "Kuala Lumpur",
        headline: "Finalist, Persuasive Speaking",
        name: "Poomkarn Taedullayasut",
        detail: "Semi-finalists: Ravipat Rodphothong (Impromptu) and Prim Chantaraprapab (Debating)",
        href: "/programs#national-team",
      },
      {
        event: "TIPSC 2025",
        where: "1 February 2025",
        headline: "180+ participants",
        name: "At International Community School Bangkok",
        detail: "Thailand's qualifier for WIDPSC, with Impromptu and Persuasive categories",
        href: "/programs#tipsc",
      },
    ],
  },
  impact: {
    title: "Our Impact",
    subtitle: "What we've done so far across Southeast Asia",
    stats: [
      { value: 35, suffix: "+", label: "Schools Impacted", icon: "school" },
      { value: 3, label: "Countries", icon: "globe" },
      { value: 500, suffix: "K", label: "THB Raised", icon: "money" },
      // TODO: confirm — the old site showed no number here; 5 = the five "Trusted By" logos.
      { value: 5, label: "Partner Organizations", icon: "partners" },
    ] as Stat[],
  },
  why: {
    title: "Why Speech?",
    subtitle: "What students get out of public speaking",
    items: [
      {
        title: "Self Advocacy",
        body: "Learn to say what you think, defend it when someone pushes back, and speak up for yourself.",
      },
      {
        title: "Communication",
        body: "Learn to explain an idea clearly and persuade people who don't agree with you yet.",
      },
      {
        title: "Career Mobility",
        body: "Presentation and leadership skills help with university applications, interviews and work.",
      },
    ],
  },
  tipsc: {
    body: "Thailand's national public speaking competition, with 180+ participants from across the country.",
    stats: [
      { value: "180+", label: "Participants" },
      { value: "4", label: "Preliminary Rounds" },
    ],
  },
  // "One sentence is the interface": each event is a word; hover / tap shows how our
  // students did in it at WIDPSC 2025 (results from the Programs and Impact pages).
  events: [
    {
      name: "Persuasive",
      tone: "#ff5a61",
      result: "Poomkarn Taedullayasut reached the WIDPSC 2025 final in Persuasive Speaking.",
      href: "/programs#national-team",
    },
    {
      name: "Impromptu",
      tone: "#e7dfd3",
      result: "Ravipat Rodphothong made the WIDPSC 2025 semi-finals in Impromptu Speaking.",
      href: "/programs#national-team",
    },
    {
      name: "Debating",
      tone: "#a9b8c9",
      result: "Prim Chantaraprapab made the WIDPSC 2025 semi-finals in Debating.",
      href: "/programs#national-team",
    },
  ],
  programs: {
    title: "Our Programs",
    subtitle: "Competitions and training for every level",
    items: [
      {
        title: "National Competitions",
        body: "We host 1 to 3 national tournaments a year for student speakers from across Thailand.",
        img: event(12, "National Competitions"),
        href: "/programs#national-competitions",
      },
      {
        title: "Pre-Competition Training",
        body: "Workshops on speaking technique, delivery, and how judges score a speech.",
        img: event(18, "Pre-Competition Training"),
        href: "/programs#training",
      },
      {
        title: "National Team Management",
        tag: "WIDPSC 2025",
        body: "We train and support Thailand's national public speaking team for WIDPSC.",
        img: event(22, "National Team Management"),
        href: "/programs#national-team",
      },
    ],
  },
  partners: [
    { name: "EasyMoney", src: "/images/logo-easymoney.jpg", w: 500, h: 500 },
    { name: "ICS", src: "/images/logo-ics.png", w: 500, h: 180 },
    { name: "KCIS", src: "/images/logo-kcis.png", w: 3508, h: 2481 },
    { name: "Lactasoy", src: "/images/logo-lactasoy.png", w: 1200, h: 641 },
    { name: "WIDPSC", src: "/images/logo-widpsc.jpg", w: 225, h: 225 },
  ],
  cta: {
    title: "Ready to Find Your Voice?",
    body: "Hundreds of students across Southeast Asia have trained with us. Sign up for a workshop to start.",
  },
};

export const about = {
  quote:
    "Speech has transformed the way I see the world and connect with people and I think it's something I'd like to see other children experience",
  quoteBy: "Speech Mania Founder, Proud R",
  whoWeAre: [
    "Speech Mania is a youth-led organization. We run public speaking and leadership programs for students across Thailand and Southeast Asia.",
    "We started Speech Mania to make good speech coaching easier to get, and to give students real stages to speak on.",
    "So far we've worked with students from 35+ schools in 3 countries through competitions, workshops and the national team.",
  ],
  mission:
    "To make top-level public speaking training available to students across Southeast Asia, so they can think clearly and speak with confidence.",
  matters: {
    title: "Why Speech Matters",
    subtitle: "Why we think every student should learn it",
    items: [
      {
        title: "Increased Ability to Self Advocate",
        body: "Students learn to state what they think and defend it. In our programs they practise speaking up for themselves and their communities, which matters in class, at work and at home.",
        img: event(42, "Increased Ability to Self Advocate", true),
      },
      {
        title: "Enhanced Communication Ability",
        body: "Our training covers voice and body language, listening, reading an audience, and persuasion. Students learn to change how they say something depending on who is listening.",
        img: event(48, "Enhanced Communication Ability"),
      },
      {
        title: "Greater Career & Educational Mobility",
        body: "Speaking well helps with scholarship and university interviews, internships and leadership roles. Our alumni have gone on to top universities, competitive internships and awards.",
        img: event(55, "Greater Career & Educational Mobility", true),
      },
    ],
  },
  team: {
    title: "Meet Our Team",
    subtitle: "The students who run Speech Mania",
    members: [
      {
        name: "Proud Rodphothong",
        role: "Founder & Executive Director",
        bio: "Represented Thailand at WIDPSC twice and was on the Thai National Debate Team. Proud started Speech Mania because of what speech did for her, and to make speaking education easier to get in Southeast Asia. Speech Mania has since worked with over 35 schools.",
        img: { src: "/images/team-proud.jpg", w: 791, h: 1148 },
      },
      {
        name: "Aiko Thangthanakeat",
        role: "Co-Founder & Communications Director",
        bio: "Former debater who has coached in the US. Aiko has run several successful fundraisers in Thailand and joined the team to help Southeast Asian students with public speaking.",
        img: { src: "/images/team-aiko.png", w: 688, h: 870 },
      },
      {
        name: "Thanadetch Mateedunsatits",
        role: "Co-Founder & Operations Director",
        bio: "Runs tournament operations and judging. Detch has helped organize more than 5 conferences and competitions in Thailand and handles logistics for Team Thailand at Worlds.",
        img: { src: "/images/team-detch.png", w: 742, h: 1114 },
      },
      {
        name: "Cedric Zarate",
        role: "Technology Director",
        bio: "Cedric runs the tech side of Speech Mania. He manages this website and leads development of speech.io, an AI practice tool that gives instant feedback on delivery and structure, so more students across Southeast Asia can practise on their own.",
        img: { src: "/images/team-cedric.jpg", w: 682, h: 1024 },
      },
    ],
  },
  cta: {
    title: "Want to Join Our Team?",
    body: "We're always looking for people to help us reach more students",
  },
};

export const widpscResults = [
  { place: "Finalist", name: "Poomkarn Taedullayasut", category: "Persuasive Speaking" },
  { place: "Semi-Finalist", name: "Ravipat Rodphothong", category: "Impromptu Speaking" },
  // TODO: confirm spelling — "Chantaraprapab" here, "Chantaprapab" in the testimonial.
  { place: "Semi-Finalist", name: "Prim Chantaraprapab", category: "Debating" },
];

export const programs = {
  title: "Our Programs",
  subtitle: "From beginner workshops to international competitions",
  competitions: {
    title: "National Competitions",
    body: "Speech Mania hosts 1 to 3 national tournaments a year where students from across Thailand compete in public speaking.",
    points: [
      "Two speech categories: Persuasive and Impromptu",
      "Professional judging by experienced coaches and former competitors",
      "Preliminary rounds leading to semi-finals and finals",
      "Recognition and awards for top performers",
      "Networking opportunities with peers nationwide",
    ],
  },
  tipsc: {
    eyebrow: "Featured Event / Our Upcoming Event",
    name: "TIPSC 2025",
    fullName: "Thailand Individual Public Speaking Competition",
    body: 'TIPSC is the national qualifier for WIDPSC 2025, the World Individual Debating and Public Speaking Championships, held in Kuala Lumpur. The 2025 theme is "Letter to a Better Future": students give speeches about a change they want to see.',
    date: "1st February 2025",
    venue: "International Community School Bangkok",
    categories: "Impromptu & Persuasive Speech",
    theme: "Letter to a Better Future",
    details: [
      ["Impromptu", "Test your quick thinking and spontaneous speaking skills"],
      ["Persuasive", "Share your vision for positive change with compelling arguments"],
      ["Theme", '"Letter to a Better Future" - focus on solutions and positive implications'],
    ],
  },
  inPerson: {
    title: "In-Person Workshops (TBD)",
    subtitle: "New in-person workshops are on the way. Leave your details and we'll tell you when they open.",
    cards: [
      "Hands-on training in public speaking, debate and performance, in small classes so each student gets individual feedback.",
      "Sessions for every level, with experienced coaches and time to practise with other students. Dates will be announced soon.",
    ],
  },
  training: {
    title: "Training Workshops",
    subtitle: "Workshops led by experienced coaches to get students ready for competition.",
    courses: [
      {
        title: "Public Speaking Fundamentals",
        length: "4 weeks",
        body: "The basics: body language, voice, and holding an audience's attention",
      },
      {
        title: "Advanced Speech Writing",
        length: "6 weeks",
        body: "Write persuasive speeches with a clear structure and rhetorical devices",
      },
      {
        title: "Judging & Evaluation",
        length: "2 weeks",
        body: "Learn to assess speeches and give useful feedback",
      },
    ],
  },
  team: {
    title: "National Team Management",
    subtitle:
      "We manage, fund, and train Thailand's National Public Speaking team for the World Individual Debating and Public Speaking Championships (WIDPSC)",
    whatIs:
      "The World Individual Debating and Public Speaking Championships is the top international public speaking competition for high school students. Students compete in impromptu speaking, persuasive speaking, debating and other events against speakers from around the world.",
    achievementsTitle: "Team Thailand WIDPSC 2025 Achievements",
  },
  cta: {
    title: "Ready to Join Our Programs?",
    body: "We have programs for beginners and for students aiming to compete",
  },
};

export const impact = {
  title: "Our Impact",
  subtitle: "Our numbers, results and students so far",
  numbersTitle: "By the Numbers",
  numbersSubtitle: "Across Thailand and Southeast Asia",
  stats: [
    { value: 35, suffix: "+", label: "Schools Impacted", icon: "school" },
    { value: 3, label: "Countries Reached", icon: "globe" },
    { value: 500, suffix: "+", label: "Students Impacted", icon: "students" },
    { value: 10, label: "National Champions Trained", icon: "trophy" },
    { value: 95, suffix: "%", label: "Student Satisfaction Rate", icon: "heart" },
    { value: 10, label: "Workshops Delivered", icon: "workshop" },
    { value: 500, suffix: "K THB", label: "Raised", icon: "money" },
  ] as Stat[],
  storiesTitle: "Success Stories",
  storiesSubtitle: "Two students on what Speech Mania meant for them",
  stories: [
    {
      // TODO: confirm spelling — "Chantaprapab" here, "Chantaraprapab" elsewhere.
      name: "Prim Chantaprapab",
      school: "Shrewsbury International School",
      title: "Worlds Debating Semi Finalist",
      img: event(32, "Prim Chantaprapab"),
      quote:
        "Speech Mania inspired me and so many other students to be brave and share our stories through the medium of speech and debate, a sport which although can be daunting - is incredibly rewarding. I felt every event they organised brought both a sense of impressive professionalism, but also deep support and camaraderie - fostering an environment which felt safe, welcoming, yet also always challenging us to go the extra mile. I'm especially grateful for the fact that Speech Mania became the first organisation to introduce the opportunity for students to qualify to represent Thailand and compete at Worlds, initiating our journey as a national team! I'm beyond excited to see the competition and community only strengthen in the future.",
    },
    {
      name: "Kate Sarisa Pheongrattana",
      school: "International Community School",
      title: "WIDPSC Team Thailand Representative, Third Best National Speaker (TIPSC 2025)",
      img: event(38, "Kate Sarisa Pheongrattana"),
      quote:
        "My journey with Speech Mania has been nothing short of amazing—from TIPSC to representing Thailand at Worlds. They took care of everything, from training sessions to logistics, which made the whole experience so smooth and I barely had to worry about anything. I'm so grateful for the chance to go to Worlds, it was truly life-changing. I grew so much, not just in my public speaking, but as a person too. Along the way, I met so many talented and inspiring people who pushed me to be better. I'd absolutely recommend Speech Mania to anyone who wants to grow, challenge themselves, and be part of an incredible community.",
    },
  ],
  achievementsTitle: "Competition Achievements",
  achievementsSubtitle: "Results at national and international competitions",
  timeline: [
    {
      year: "2025",
      title: "WIDPSC World Championships",
      items: [
        "Finalist - Persuasive Speaking (Poomkarn Taedullayasut)",
        "Semi-Finalist - Impromptu Speaking (Ravipat Rodphothong)",
        "Semi-Finalist - Debating (Prim Chantaraprapab)",
      ],
    },
    {
      year: "2024",
      title: "Thailand National Championship",
      items: [
        "1st Place - Overall Champion",
        "3 category winners from Speech Mania students",
        "12 students reached semi-finals",
      ],
    },
    { year: "2023", title: "Program Launch", items: ["2 workshops delivered"] },
  ],
  galleryTitle: "Moments That Matter",
  gallerySubtitle: "Photos from TIPSC 2025",
  cta: {
    title: "Want to take part?",
    body: "Register for a workshop or our next competition",
  },
};

// TODO: replace "#" with real PDF files (e.g. put them in public/files/).
export const PLACEHOLDER_PDF = "#";

export const getInvolved = {
  title: "Get Involved",
  subtitle: "Ways to take part as a student, school or sponsor",
  intro:
    "Students can join our workshops and competitions. Schools can partner with us, and sponsors can fund places for students who couldn't otherwise attend.",
  paths: [
    {
      id: "students",
      title: "For Students",
      body: "Develop your public speaking skills through workshops, compete in national tournaments, and represent Thailand at international competitions.",
      links: [
        { label: "Register for Workshop", href: "#register" },
        { label: "Learn About TIPSC 2025", href: "/programs#tipsc" },
        { label: "National Team Info", href: "/programs#national-team" },
      ],
    },
    {
      id: "schools",
      title: "For Schools",
      body: "Partner with us to run workshops at your school and enter your students in our competitions.",
      links: [
        { label: "Partner With Us", href: "/contact" },
        { label: "Request Workshop", href: "#register" },
        { label: "View Programs", href: "/programs" },
      ],
    },
    {
      id: "sponsors",
      title: "For Sponsors",
      body: "Fund competitions, scholarships and new workshops for students in Southeast Asia.",
      links: [
        { label: "Download Sponsorship Package", href: PLACEHOLDER_PDF },
        { label: "Schedule a Meeting", href: "/contact" },
        { label: "Learn About Impact", href: "/impact" },
      ],
    },
    {
      id: "resources",
      title: "Free Resources",
      body: "Free slides, training guides and sample ballots for speakers and judges.",
      links: [
        { label: "Browse All Resources", href: "#resources" },
        { label: "Event Outreach Slides", href: PLACEHOLDER_PDF },
        { label: "Sample Ballots", href: "#resources" },
      ],
    },
  ],
  registration: {
    title: "Workshop Registration",
    subtitle: "Sign up for an upcoming workshop or training session",
    programOptions: [
      "Public Speaking Fundamentals",
      "Advanced Speech Writing",
      "Judging & Evaluation",
      "TIPSC 2025 Competition",
      "National Team Application",
    ],
  },
  sponsor: {
    title: "Sponsor Our Mission",
    subtitle:
      "Sponsorship pays for students who couldn't otherwise afford our programs.",
    options: [
      { title: "Tournament Sponsorship", body: "Back a competition and have your brand seen at the event" },
      { title: "Scholarship Fund", body: "Cover program fees for students who can't pay them" },
      { title: "Program Development", body: "Fund new workshops and expand to more schools" },
    ],
    impactTitle: "Sponsorship Impact",
    impact: [
      { value: "500K THB", label: "Raised to support our programs" },
      { value: "35+ Schools", label: "Reached through partnerships" },
      { value: "500+ Students", label: "Trained with sponsor support" },
    ],
    quote:
      "Supporting Speech Mania has been one of the most rewarding partnerships for our organization. We've seen firsthand the incredible impact on student confidence and capability.",
    quoteBy: "Partner Organization",
  },
  resources: {
    title: "Free Resources",
    subtitle: "Guides and materials you can download for free",
    items: [
      {
        title: "2025 Event Outreach Slides",
        body: "Event information and outreach slides for our 2025 programs.",
      },
      { title: "Impromptu Sample Ballots", body: "Sample ballots and judging criteria for impromptu speaking events." },
      { title: "Interpretive Speech Training Slides", body: "Training materials for interpretive speech performance." },
      { title: "Persuasive Sample Ballots", body: "Sample ballots and rubrics for persuasive speech competitions." },
    ],
  },
};

export const contactPage = {
  title: "Contact Us",
  subtitle: "Questions about programs, partnerships or sponsorship? Send us a message.",
  formTitle: "Send Us a Message",
  purposes: ["Student Inquiry", "School Partnership", "Sponsorship", "Media & Press", "General Question"],
  formNote: "We typically respond within 24-48 hours",
  touchTitle: "Get in Touch",
  touchBody:
    "Students, schools and sponsors can all reach us here.",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Answers to what people ask us most",
  faq: [
    {
      group: "For Students",
      items: [
        {
          q: "How do I register for a workshop?",
          a: `Visit our Get Involved page and fill out the registration form. You can also email us directly at ${contact.email} with your details and program interest.`,
        },
        {
          q: "What is the cost of workshops?",
          a: "Workshop costs vary by program. We offer scholarships and financial aid for students who demonstrate need. Contact us to discuss pricing and available support.",
        },
        {
          q: "Do I need prior speaking experience?",
          a: "No! Our programs welcome students of all skill levels, from complete beginners to advanced competitors.",
        },
      ],
    },
    {
      group: "For Schools",
      items: [
        {
          q: "How can my school partner with Speech Mania?",
          a: "We offer several partnership models including hosting workshops, competition participation, and curriculum integration. Contact us to discuss the best fit for your institution.",
        },
        {
          q: "What resources do you provide to partner schools?",
          a: "Partners receive access to our curriculum materials, teacher training, student workshop sessions, and priority registration for competitions.",
        },
      ],
    },
    {
      group: "For Sponsors",
      items: [
        {
          q: "What are the sponsorship levels?",
          a: "We offer Bronze, Silver, Gold, and Platinum sponsorship tiers ranging from 50,000 to 500,000 THB. Each level includes different benefits and visibility opportunities.",
        },
        {
          q: "How is sponsorship money used?",
          a: "Funds support competition hosting, student scholarships, program development, and national team training. We provide detailed impact reports to all sponsors.",
        },
      ],
    },
    {
      group: "General",
      items: [
        {
          q: "What is WIDPSC?",
          a: "The World Individual Debating and Public Speaking Championships is the most prestigious international competition for high school public speaking. Speech Mania manages and trains Team Thailand.",
        },
        {
          q: "How can I stay updated on Speech Mania events?",
          a: "Follow us on social media or sign up for our newsletter through the contact form to receive updates on competitions, workshops, and achievements.",
        },
      ],
    },
  ],
  bottom: "Didn't find what you were looking for?",
};
