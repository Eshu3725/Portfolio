// Single source of truth for everything the portfolio displays (based on the 2026 resume).

export const profile = {
  name: 'Eshaan A V',
  firstName: 'Eshaan',
  surname: 'A V',
  headline: 'AI & Data Science Engineering Student',
  location: 'Tumkur, Karnataka, India',
  homeCode: 'TUM',
  coords: '13.34°N · 77.10°E',
  timezone: 'Asia/Kolkata',
  email: 'eshaanvenkatesh3725@gmail.com',
  currentRole: { title: 'Trainee', company: 'OtomeytAI', since: 'September 2026' },
  // split-flap board: max 14 characters each
  roles: ['AI & DATA SCI', 'DATA PIPELINES', 'FULL STACK DEV', '3D ANIMATION'],
  tagline:
    'Final-year AI & Data Science Engineering student with hands-on experience in data engineering, AI/ML and 3D animation.',
  bio: [
    "I've built SECT, an AI-powered social platform for travellers, FinSecureAnon, a PII anonymization tool for financial documents, and Signify.Ed, an AI-powered Indian Sign Language learning platform. I'm currently a Trainee at OtomeytAI, and my team secured a top-10 finish among 50 teams at AI Brewery 2026.",
    "Beyond code, I love travelling and exploring new cultures. Travelling isn't just a hobby — it's how I gain new perspectives, meet diverse people, and find the inspiration that fuels my work.",
  ],
  languages: ['English', 'Kannada', 'Hindi'],
  quote: { text: 'Life is born to live, not to survive.', author: 'Albert Einstein' },
};

// Identity page of the passport
export const passportFields = [
  { label: 'Type', value: 'P' },
  { label: 'Code', value: 'IND' },
  { label: 'Surname', value: 'A V', wide: true },
  { label: 'Given name', value: 'ESHAAN', wide: true },
  { label: 'Profession', value: 'AI & Data Science Student', wide: true },
  { label: 'Institution', value: 'Siddaganga Institute of Technology', wide: true },
  { label: 'Currently', value: 'Trainee · OtomeytAI' },
  { label: 'Home base', value: 'Tumkur, KA' },
  { label: 'Speaks', value: 'EN · KN · HI' },
  { label: 'Valid until', value: '∞ curiosity' },
];

export const navItems = [
  { id: 'home', label: 'Departure', code: '01' },
  { id: 'about', label: 'Passport', code: '02' },
  { id: 'skills', label: 'Travel Kit', code: '03' },
  { id: 'projects', label: 'Destinations', code: '04' },
  { id: 'contact', label: 'Postcard', code: '05' },
];

export const socials = [
  { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Eshu3725' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/eshaan-a-v-62068028a/' },
  { name: 'X', icon: 'fab fa-x-twitter', url: 'https://x.com/Eshaan9320' },
  { name: 'Dribbble', icon: 'fab fa-dribbble', url: 'https://dribbble.com/Eshu3725' },
];

// Flight log — status: 'landed' | 'live' | 'scheduled'
export const timeline = [
  {
    year: '2023',
    title: 'Pre-University · Vidyanidhi PU College',
    description: 'Completed pre-university and set course for engineering.',
    status: 'landed',
  },
  {
    year: '2023',
    title: 'Boarded B.E. in AI & Data Science',
    description:
      'Began my Bachelor’s in Artificial Intelligence and Data Science Engineering at Siddaganga Institute of Technology, Tumkur.',
    status: 'landed',
  },
  {
    year: '2025',
    title: 'Symbiot 2025 Hackathon',
    description: 'Took part in the external hackathon at Vidyavardhaka College of Engineering.',
    status: 'landed',
  },
  {
    year: '2025 – 26',
    title: 'Team Auto Architects · ATV Club',
    description:
      'Graphic Designer and Digital Team member. Competed in BAJA SAE INDIA 2025 and ATVC 2026, and built the club’s full-stack website.',
    status: 'landed',
  },
  {
    year: '2026',
    title: 'Top 10 at AI Brewery 2026',
    description: 'Secured a top-10 position among 50 participating teams in the internal AI hackathon.',
    status: 'landed',
  },
  {
    year: 'Sep 2026',
    title: 'Trainee at OtomeytAI',
    description: 'Currently working as a Trainee at OtomeytAI.',
    status: 'live',
  },
  {
    year: '2027',
    title: 'Graduation · B.E. AI & Data Science',
    description: 'Final approach — expected to complete my degree in 2027.',
    status: 'scheduled',
  },
];

export const skillGates = [
  {
    id: 'A',
    title: 'Programming & Databases',
    short: 'Code & DBs',
    icon: 'fas fa-code',
    skills: [
      { name: 'Python', note: 'Core language', icon: 'fab fa-python', color: '#3776ab' },
      { name: 'SQL', note: 'Querying', icon: 'fas fa-table', color: '#336791' },
      { name: 'PySpark', note: 'Big data', icon: 'fas fa-bolt', color: '#e25a1c' },
      { name: 'C++', note: 'Systems', icon: 'fas fa-code', color: '#00599c' },
      { name: 'MongoDB', note: 'NoSQL', icon: 'fas fa-leaf', color: '#47a248' },
    ],
  },
  {
    id: 'B',
    title: 'Data Engineering & Cloud',
    short: 'Data & Cloud',
    icon: 'fas fa-cloud',
    skills: [
      { name: 'Apache Kafka', note: 'Streaming', icon: 'fas fa-bars-staggered', color: '#5b6170' },
      { name: 'Azure', note: 'Cloud', icon: 'fab fa-microsoft', color: '#0078d4' },
      { name: 'Docker', note: 'Containers', icon: 'fab fa-docker', color: '#2496ed' },
    ],
  },
  {
    id: 'C',
    title: 'AI / Data',
    short: 'AI & Data',
    icon: 'fas fa-brain',
    skills: [
      { name: 'Machine Learning', note: 'Models', icon: 'fas fa-brain', color: '#e5484d' },
      { name: 'Artificial Intelligence', note: 'AI products', icon: 'fas fa-robot', color: '#8b5cf6' },
      { name: 'Data Science', note: 'Analysis', icon: 'fas fa-chart-pie', color: '#d97706' },
    ],
  },
  {
    id: 'D',
    title: 'Web & Creative',
    short: 'Web & 3D',
    icon: 'fas fa-cube',
    skills: [
      { name: 'Blender', note: '3D & animation', icon: 'fas fa-cube', color: '#ea7600' },
      { name: 'Web Development', note: 'Full stack', icon: 'fas fa-globe', color: '#0ea5e9' },
      { name: 'React', note: 'Front-end', icon: 'fab fa-react', color: '#1aa6c9' },
      { name: 'JavaScript', note: 'Language', icon: 'fab fa-js', color: '#e0b400' },
      { name: 'HTML & CSS', note: 'Markup & style', icon: 'fab fa-html5', color: '#e34f26' },
      { name: 'Git', note: 'Version control', icon: 'fab fa-git-alt', color: '#f05032' },
    ],
  },
];

// Flagship project, shown as a large boarding-pass feature
export const featuredProject = {
  code: 'SCT',
  title: 'SECT',
  subtitle: 'AI-Powered Social Media Platform for Travellers',
  description:
    'A full-stack travel social network — plan the trip, talk to locals, share the memories and split the bill, all in one place.',
  features: [
    {
      icon: 'fas fa-images',
      title: 'Feed, stories & DMs',
      text: 'Browse posts and stories, message directly, and follow or unfollow fellow travellers.',
    },
    {
      icon: 'fas fa-route',
      title: 'AI Trip Planner',
      text: 'Generates itineraries and suggests flights, hotels and local transport.',
    },
    {
      icon: 'fas fa-language',
      title: 'AI Translator',
      text: 'Two-way conversation translation with a camera overlay.',
    },
    {
      icon: 'fas fa-people-group',
      title: 'Trip spaces',
      text: 'Share photos, message everyone on the trip and split expenses.',
    },
    {
      icon: 'fas fa-user-gear',
      title: 'Admin portal',
      text: 'Role-restricted dashboards for HR, Technical Support, Financials and Customer Support, plus full site management.',
    },
  ],
  roadmap: [
    { icon: 'fas fa-key', text: 'Migrating authentication from Clerk to Supabase' },
    { icon: 'fas fa-spider', text: 'Web scraping Skyscanner, Headout & Eventbrite for planner accuracy' },
    { icon: 'fas fa-bell', text: 'Twilio SendGrid email, WhatsApp & SMS alerts' },
  ],
};

// Postcards. `image` is optional — cards without one get an illustrated poster front.
export const projects = [
  {
    id: 'finsecureanon',
    code: 'FSA',
    title: 'FinSecureAnon',
    category: 'AI · Data Privacy',
    icon: 'fas fa-user-shield',
    palette: ['#0f2a4a', '#1b6b5a', '#f2c14e'],
    description:
      'A tool that detects and anonymizes personally identifiable information (PII) in financial documents — built for banking, marketing and other data-sensitive sectors.',
    tags: ['PII detection', 'Anonymization', 'Financial documents', 'Data privacy'],
    github: 'https://github.com/Eshu3725/finsecureanon',
    live: null,
  },
  {
    id: 'signify',
    code: 'SGN',
    title: 'Signify.Ed',
    category: 'AI/ML · EdTech · 3D',
    icon: 'fas fa-hands-asl-interpreting',
    palette: ['#3b1f5c', '#c2477a', '#ffd27a'],
    description:
      'An assistive learning platform that helps deaf and hard-of-hearing learners study Indian Sign Language independently. ISL actions are performed by a trained 3D character I created in Blender.',
    tags: ['AI/ML', 'Indian Sign Language', 'Blender 3D', 'Graphic design'],
    github: null,
    live: null,
  },
  {
    id: 'autoarchitects',
    code: 'TAA',
    title: 'Auto Architects',
    category: 'Full Stack · Club Website',
    icon: 'fas fa-truck-monster',
    palette: ['#2b1d0e', '#b5531c', '#ffcf70'],
    description:
      'A full-stack website for Team Auto Architects, our ATV club, with role-based login, separate Admin and Member interfaces, attendance tracking and member records.',
    tags: ['Full stack', 'Role-based auth', 'Attendance tracking', 'Admin & Member views'],
    github: 'https://github.com/Eshu3725/autoarchitects',
    live: 'https://autoarchitects.vercel.app',
  },
  {
    id: 'portfolio',
    code: 'PRT',
    title: 'Portfolio',
    category: 'Front-end · Personal',
    icon: 'fas fa-globe-asia',
    image: '/portfolio_bg.jpg',
    description:
      "A front-end portfolio presenting my background, projects and travels — the very postcard you're holding right now.",
    tags: ['React', 'Vite', 'Framer Motion', 'EmailJS'],
    github: 'https://github.com/Eshu3725/Portfolio',
    live: 'https://eshaan36.netlify.app/',
  },
];

export const stats = [
  {
    value: `${projects.length + 1}`,
    label: 'Projects',
    sub: 'Built',
    shape: 'rect',
    color: '#1f5fa8',
    rotate: 5,
  },
  { value: 'Top 10', label: 'AI Brewery', sub: '2026 · of 50', shape: 'oval', color: '#c8382f', rotate: -6 },
  { value: '2027', label: 'B.E. AI & DS', sub: 'Graduating', shape: 'round', color: '#2f7d4f', rotate: -9 },
];
