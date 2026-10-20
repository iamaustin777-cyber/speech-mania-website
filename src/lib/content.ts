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
  hero: event(40, "Student presenting on stage"),
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
    "Empowering students across Thailand and Southeast Asia through public speaking and leadership programs.",
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
export type Stat = { value: number; suffix?: string; label: string };

export const home = {
  hero: {
    line1: "Find Your Voice.",
    line2: "Shape Your Future.",
    body: "Speech Mania empowers students across Southeast Asia to discover the transformative power of public speaking. From first-time speakers to world champions, we help you develop the confidence and skills to make your voice heard.",
    badge: { value: "180+", label: "Participants" },
  },
  impact: {
    title: "Our Impact",
    subtitle: "Making a difference across Southeast Asia through education and empowerment",
    stats: [
      { value: 35, suffix: "+", label: "Schools Impacted" },
      { value: 3, label: "Countries" },
      { value: 500, suffix: "K", label: "THB Raised" },
      // TODO: confirm — the old site showed no number here; 5 = the five "Trusted By" logos.
      { value: 5, label: "Partner Organizations" },
    ] as Stat[],
  },
  why: {
    title: "Why Speech?",
    subtitle: "Speech can change lives through powerful skills and confidence",
    items: [
      {
        title: "Self Advocacy",
        body: "Learn to articulate your thoughts, defend your positions, and stand up for what you believe in with confidence and clarity.",
      },
      {
        title: "Communication",
        body: "Master the art of effective communication, build meaningful connections, and influence others through powerful speaking.",
      },
      {
        title: "Career Mobility",
        body: "Open doors to educational and professional opportunities through enhanced presentation and leadership skills.",
      },
    ],
  },
  tipsc: {
    body: "Join Thailand's premier public speaking competition with 180+ participants from across the nation.",
    stats: [
      { value: "180+", label: "Participants" },
      { value: "4", label: "Preliminary Rounds" },
    ],
  },
  programs: {
    title: "Our Programs",
    subtitle: "Comprehensive training and competition opportunities for every skill level",
    items: [
      {
        title: "National Competitions",
        body: "Host 1-3 national tournaments yearly, bringing together the best student speakers from across Thailand.",
        img: event(12, "National Competitions"),
        href: "/programs#national-competitions",
      },
      {
        title: "Pre-Competition Training",
        body: "Expert-led workshops in public speaking techniques, judging criteria, and performance skills.",
        img: event(18, "Pre-Competition Training"),
        href: "/programs#training",
      },
      {
        title: "National Team Management",
        tag: "WIDPSC 2025",
        body: "Train and support Thailand's National Public Speaking team for WIDPSC international competition.",
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
    body: "Join hundreds of students across Southeast Asia in developing confidence and communication skills.",
  },
};

export const about = {
  quote:
    "Speech has transformed the way I see the world and connect with people and I think it's something I'd like to see other children experience",
  quoteBy: "Speech Mania Founder, Proud R",
  whoWeAre: [
    "Speech Mania is a youth-led organization that empowers students across Thailand and Southeast Asia to develop their own voices and learn about different ideas through public speaking and leadership programs.",
    "Founded to make high-quality speech education accessible, we foster communication skills within youths and provide them with platforms to showcase their talents and perspectives.",
    "Through competitions, workshops, and national team management, we've impacted 35+ schools across 3 countries, creating a vibrant community of confident, articulate young leaders.",
  ],
  mission:
    "To empower the next generation of leaders by making world-class public speaking education accessible to students across Southeast Asia, fostering confidence, critical thinking, and communication excellence.",
  matters: {
    title: "Why Speech Matters",
    subtitle: "Public speaking is more than just talking—it's about transforming lives",
    items: [
      {
        title: "Increased Ability to Self Advocate",
        body: "Public speaking empowers students to articulate their thoughts clearly, defend their positions with confidence, and stand up for what they believe in. Through our programs, students learn to express their needs, challenge injustice, and advocate for themselves and their communities. This skill is invaluable in academic settings, future careers, and personal relationships.",
        img: event(42, "Increased Ability to Self Advocate", true),
      },
      {
        title: "Enhanced Communication Ability",
        body: "Effective communication is the cornerstone of success in every field. Our training helps students master verbal and non-verbal communication, active listening, audience analysis, and persuasive techniques. Students learn to adapt their message to different contexts, read social cues, and build meaningful connections that last a lifetime.",
        img: event(48, "Enhanced Communication Ability"),
      },
      {
        title: "Greater Career & Educational Mobility",
        body: "Strong public speaking skills open doors to scholarships, internships, and leadership positions. Our alumni have been accepted to top universities worldwide, secured competitive internships, and won prestigious awards. The confidence and competence gained through speech training translates directly to interview success, networking opportunities, and professional advancement.",
        img: event(55, "Greater Career & Educational Mobility", true),
      },
    ],
  },
  team: {
    title: "Meet Our Team",
    subtitle: "Passionate youth leaders dedicated to empowering the next generation of speakers",
    members: [
      {
        name: "Proud Rodphothong",
        role: "Founder & Executive Director",
        bio: "Former WIDPSC 2x Thailand Representative and Part of the Thai National Debate Team. Proud founded Speech Mania inspired by how speech has impacted her own life and in hopes of increasing access to speaking education in Southeast Asia. Under their leadership the organization has impacted over 35 schools.",
        img: { src: "/images/team-proud.jpg", w: 791, h: 1148 },
      },
      {
        name: "Aiko Thangthanakeat",
        role: "Co-Founder & Communications Director",
        bio: "Former Debater with coaching experience in America. Aiko has extensive experience in public speaking and outreach having run multiple successful fundraisers in Thailand. Aiko joined the team in hopes of sharing her skills and expertise in helping South-East Asian students.",
        img: { src: "/images/team-aiko.png", w: 688, h: 870 },
      },
      {
        name: "Thanadetch Mateedunsatits",
        role: "Co-Founder & Operations Director",
        bio: "Manages all tournament operations and judging coordination. Detch has helped organize over 5 conferences and competitions in Thailand and also oversees the logistics of Team Thailand at Worlds.",
        img: { src: "/images/team-detch.png", w: 742, h: 1114 },
      },
      {
        name: "Cedric Zarate",
        role: "Technology Director",
        bio: "Cedric oversees all things tech at Speech Mania. He manages our website and leads development of speech.io, an AI practice companion that gives instant, actionable feedback on delivery and structure. His work centers on access and scalability, making high-quality speaking practice available to students across Southeast Asia.",
        img: { src: "/images/team-cedric.jpg", w: 682, h: 1024 },
      },
    ],
  },
  cta: {
    title: "Want to Join Our Team?",
    body: "We're always looking for passionate individuals to help expand our impact",
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
  subtitle: "Comprehensive public speaking education from beginner workshops to international competitions",
  competitions: {
    title: "National Competitions",
    body: "Speech Mania hosts 1-3 national tournaments yearly, providing a platform for students across Thailand to showcase their public speaking talents and compete at the highest level.",
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
    body: 'The Thailand Individual Public Speaking Competition (TIPSC) is a national qualifier for the most prestigious tournament for public speaking, WIDPSC 25 (Worlds Individual Public Speaking and Debate 2025) which will be hosted in Kuala Lumpur this year. Join us for our flagship competition featuring the theme "Letter to a Better Future" - where students share their vision for positive change through powerful speeches.',
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
    subtitle: "Exciting new workshop programs coming soon. Be the first to know when they launch!",
    cards: [
      "Our upcoming in-person workshops will provide hands-on training in public speaking, debate techniques, and performance skills. Small class sizes ensure personalized attention and rapid skill development.",
      "Interactive sessions designed for students at all levels. Learn from experienced coaches and practice with peers in a supportive environment. Workshop schedules will be announced soon.",
    ],
  },
  training: {
    title: "Training Workshops",
    subtitle: "Expert-led workshops designed to prepare students for competition success and develop lifelong communication skills.",
    courses: [
      {
        title: "Public Speaking Fundamentals",
        length: "4 weeks",
        body: "Master the basics: body language, vocal variety, and audience engagement",
      },
      {
        title: "Advanced Speech Writing",
        length: "6 weeks",
        body: "Craft compelling narratives with persuasive structure and rhetorical devices",
      },
      {
        title: "Judging & Evaluation",
        length: "2 weeks",
        body: "Learn to analyze speeches and provide constructive feedback",
      },
    ],
  },
  team: {
    title: "National Team Management",
    subtitle:
      "We manage, fund, and train Thailand's National Public Speaking team for the World Individual Debating and Public Speaking Championships (WIDPSC)",
    whatIs:
      "The World Individual Debating and Public Speaking Championships is the most prestigious competitive public speaking competition for high schools globally. Students compete in multiple categories including impromptu speaking, persuasive speaking, and debating against the best young orators from around the world.",
    achievementsTitle: "Team Thailand WIDPSC 2025 Achievements",
  },
  cta: {
    title: "Ready to Join Our Programs?",
    body: "Whether you're a beginner or aspiring champion, we have a program for you",
  },
};

export const impact = {
  title: "Our Impact",
  subtitle: "Transforming lives and building confident leaders across Southeast Asia",
  numbersTitle: "By the Numbers",
  numbersSubtitle: "Our reach and impact continue to grow",
  stats: [
    { value: 35, suffix: "+", label: "Schools Impacted" },
    { value: 3, label: "Countries Reached" },
    { value: 500, suffix: "+", label: "Students Impacted" },
    { value: 10, label: "National Champions Trained" },
    { value: 95, suffix: "%", label: "Student Satisfaction Rate" },
    { value: 10, label: "Workshops Delivered" },
    { value: 500, suffix: "K THB", label: "Raised" },
  ] as Stat[],
  storiesTitle: "Success Stories",
  storiesSubtitle: "Hear from students whose lives were transformed",
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
  achievementsSubtitle: "Our students excel on national and international stages",
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
  gallerySubtitle: "Capturing the energy and excitement of our events",
  cta: {
    title: "Be Part of Our Success Story",
    body: "Join hundreds of students who have transformed their lives through public speaking",
  },
};

// TODO: replace "#" with real PDF files (e.g. put them in public/files/).
export const PLACEHOLDER_PDF = "#";

export const getInvolved = {
  title: "Get Involved",
  subtitle: "There are many ways to join the Speech Mania community and make an impact",
  intro:
    "Whether you're a student looking to develop your speaking skills, a school interested in partnership opportunities, or a sponsor wanting to support youth education, we welcome you to be part of our growing community. Together, we're building the next generation of confident, articulate leaders across Southeast Asia.",
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
      body: "Bring world-class speech and debate education to your institution through partnerships, workshops, and competition participation.",
      links: [
        { label: "Partner With Us", href: "/contact" },
        { label: "Request Workshop", href: "#register" },
        { label: "View Programs", href: "/programs" },
      ],
    },
    {
      id: "sponsors",
      title: "For Sponsors",
      body: "Support Southeast Asian students in developing leadership and communication skills that will shape their futures.",
      links: [
        { label: "Download Sponsorship Package", href: PLACEHOLDER_PDF },
        { label: "Schedule a Meeting", href: "/contact" },
        { label: "Learn About Impact", href: "/impact" },
      ],
    },
    {
      id: "resources",
      title: "Free Resources",
      body: "Download competition materials, training guides, and sample ballots to improve your speaking and judging skills.",
      links: [
        { label: "Browse All Resources", href: "#resources" },
        { label: "Event Outreach Slides", href: PLACEHOLDER_PDF },
        { label: "Sample Ballots", href: "#resources" },
      ],
    },
  ],
  registration: {
    title: "Workshop Registration",
    subtitle: "Join our upcoming public speaking workshops and training sessions",
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
      "Your support helps us provide world-class speech education to students who might not otherwise have access to these opportunities.",
    options: [
      { title: "Tournament Sponsorship", body: "Support our flagship competitions and get brand visibility" },
      { title: "Scholarship Fund", body: "Help talented students access our programs regardless of financial means" },
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
    subtitle: "Download guides and materials to enhance your speaking skills",
    items: [
      {
        title: "2025 Event Outreach Slides",
        body: "Comprehensive event information and outreach materials for our 2025 programs.",
      },
      { title: "Impromptu Sample Ballots", body: "Sample ballots and judging criteria for impromptu speaking events." },
      { title: "Interpretive Speech Training Slides", body: "Training materials for interpretive speech performance." },
      { title: "Persuasive Sample Ballots", body: "Sample ballots and rubrics for persuasive speech competitions." },
    ],
  },
};

export const contactPage = {
  title: "Contact Us",
  subtitle: "We'd love to hear from you. Reach out with any questions or inquiries.",
  formTitle: "Send Us a Message",
  purposes: ["Student Inquiry", "School Partnership", "Sponsorship", "Media & Press", "General Question"],
  formNote: "We typically respond within 24-48 hours",
  touchTitle: "Get in Touch",
  touchBody:
    "Whether you're a student interested in our programs, a school looking to partner, or a potential sponsor, we're here to help.",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Find quick answers to common questions",
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
