export const PROFILE = {
  name: 'Alankrit Srivastava',
  kana: 'アランクリット・スリヴァスタヴァ',
  role: 'Java Full Stack Developer',
  email: 'alankritsrivastava26@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/alankrit-srivastava-558789407' },
    { label: 'GitHub', href: 'https://github.com/Alankrit-Srivastava' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Alankrit9999' },
    { label: 'HackerRank', href: 'https://hackerrank.com/profile/alankritsrivast4' },
  ],
} as const;

export const WORKED_WITH = ['Toyota Europe', 'Infosys', 'Thomson Digital', 'YesMadam'] as const;

export const CAPABILITIES = [
  {
    title: 'Backend microservices',
    kana: 'バックエンド',
    detail: 'Java 17 · Spring Boot · Spring Security · Spring Batch · Hibernate/JPA · REST · OAuth2 / JWT · Kafka · ActiveMQ',
  },
  {
    title: 'Angular & React front ends',
    kana: 'フロントエンド',
    detail: 'Angular · RxJS · React · TypeScript · Tailwind CSS · Vite · Thymeleaf when server-rendered is the right call',
  },
  {
    title: 'Document AI & parsing',
    kana: 'ドキュメントAI',
    detail: 'GROBID · Regex · Java-based RAG · AI / API integration · schema-validated XML generation',
  },
  {
    title: 'Cloud, CI/CD & quality',
    kana: 'クラウド',
    detail: 'AWS EC2 / S3 · Docker · Maven · Bamboo · JUnit 5 · Mockito · Swagger · CheckMarx SAST / SCA',
  },
] as const;

export const STATEMENT =
  'I write the backend that has to work at 2 a.m., and the front end that makes it feel simple. Monoliths split into microservices. Documents parsed into clean XML. Forms that fill themselves. No nonsense, always in production.';
export const STATEMENT_HOT = ['2', 'a.m.,', 'microservices.', 'XML.', 'themselves.', 'production.'];

export type Accent = 'tomato' | 'mustard' | 'blush' | 'fur';

export type Project = {
  title: string;
  accent: Accent;
  glyph: string;
  tag: string;
  live?: boolean;
  metric: string;
  metricNote: string;
  role: string;
  domain: string;
  summary: string;
  stack: string;
};

export const PROJECTS: Project[] = [
  {
    title: 'PDF-to-XML Automation Engine',
    accent: 'tomato',
    glyph: '変',
    tag: 'Thomson Digital · 2026',
    metric: '70%',
    metricNote: 'faster PDF-to-XML turnaround',
    role: 'Lead developer',
    domain: 'Publishing',
    summary:
      'Replaced manual document processing with an automated parsing engine: GROBID for structure and metadata, regex and normalization for precise extraction, Java-based RAG for context-aware parsing of non-standard layouts.',
    stack: 'Java 17 · Spring Boot · GROBID · RAG · Regex · JUnit / Mockito',
  },
  {
    title: 'UniSec',
    accent: 'mustard',
    glyph: '盾',
    tag: 'Thomson Digital · 2026',
    metric: 'End to end',
    metricNote: 'architected and delivered',
    role: 'Architecture + build',
    domain: 'Enterprise',
    summary:
      'Modular Java 17 and Spring Boot microservices behind reactive Angular dashboards, with clean architecture, robust error handling and unit coverage from day one.',
    stack: 'Java 17 · Spring Boot · Angular · RxJS · Microservices',
  },
  {
    title: 'JobHunter AI',
    accent: 'blush',
    glyph: '狩',
    tag: 'Personal · in progress',
    live: true,
    metric: '323',
    metricNote: 'offline tests green, none submit',
    role: 'Solo build',
    domain: '2026',
    summary:
      'Safety-first job application engine: discovers roles from board and ATS APIs, scores fit with Gemini structured outputs, routes to automated, supervised or assisted lanes, verifies receipts over read-only IMAP. A Chrome side-panel extension fills forms on click and never submits.',
    stack: 'Spring Boot · JPA · Playwright · Gemini API · IMAP · Chrome MV3',
  },
  {
    title: 'Toyota Europe Modernization',
    accent: 'fur',
    glyph: '改',
    tag: 'Infosys · Toyota Europe · 2022–25',
    metric: '15%',
    metricNote: 'less downtime after the migration',
    role: 'Full-stack lead',
    domain: 'Automotive',
    summary:
      'Migrated a legacy monolith to scalable microservices, designed REST APIs to HLD/LLD, remediated CheckMarx findings for 25% lower security risk, and cut production bugs by 30% through reviews and automated tests.',
    stack: 'Java · Spring Boot · Angular · AWS · Kafka · IBM DB2 · Bamboo',
  },
  {
    title: 'Admin & Service Provider Platform',
    accent: 'mustard',
    glyph: '探',
    tag: 'YesMadam · 2025–26',
    metric: 'Fuzzy',
    metricNote: 'edit-distance search that forgives typos',
    role: 'Backend developer',
    domain: 'Marketplace',
    summary:
      'Core backend for the admin and provider apps: edit-distance fuzzy search, a round-robin scheduler for fair task assignment and API load balancing, and end-to-end ownership of orders, profiles and admin modules.',
    stack: 'Java · Spring Boot · JSP · AJAX · MySQL',
  },
  {
    title: 'Movie Ticket Booking System',
    accent: 'tomato',
    glyph: '映',
    tag: 'Personal',
    metric: 'Kafka',
    metricNote: 'event-driven, high concurrency',
    role: 'Solo build',
    domain: 'Side project',
    summary:
      'High-concurrency booking engine with event-driven seat processing, search, ratings and email confirmations via the Java Mail API. Two more side builds, an e-commerce platform and a library system, live on GitHub.',
    stack: 'Java · Spring Boot · MySQL · Kafka · Java Mail',
  },
];

export type Episode = {
  num: string;
  start: string;
  title: string;
  arc: string;
  arcKana: string;
  points: { lead?: string; text: string }[];
  range: string;
  duration: string;
};

export const EPISODES: Episode[] = [
  {
    num: 'EP.01',
    start: 'Apr 2022',
    title: 'Senior System Engineer',
    arc: 'Infosys · The Toyota Europe arc',
    arcKana: 'トヨタ編',
    points: [
      { text: 'Led full-stack development and modernization of critical enterprise systems with Java, Spring Boot, microservices, Angular and AWS, from design to deployment.' },
      { lead: 'Migrated a legacy monolith to microservices', text: ', reducing application downtime by 15%.' },
      { text: 'Ran SAST and SCA with CheckMarx and remediated critical vulnerabilities, reducing security risk by 25%.' },
      { text: 'Cut production bugs by 30% through code reviews and JUnit / Mockito coverage; shipped through Maven and Bamboo CI/CD.' },
      { text: 'Built secure services and batch jobs with Spring Security and Spring Batch, and event-driven flows on ActiveMQ and Kafka.' },
    ],
    range: 'Apr 2022 → Jul 2025',
    duration: '3 years 4 months',
  },
  {
    num: 'EP.02',
    start: 'Jul 2025',
    title: 'Java Developer',
    arc: 'YesMadam · The marketplace arc',
    arcKana: '市場編',
    points: [
      { text: 'Developed core backend features for the Admin Application and Service Provider platform with Java, Spring Boot, JSP, AJAX and MySQL.' },
      { lead: 'Implemented an edit-distance fuzzy search', text: ' so typos and partial queries still find the right service.' },
      { text: 'Built a round-robin scheduling algorithm for API load balancing and fair task assignment across providers.' },
      { text: 'Owned order placement, customer profile and admin modules end to end.' },
    ],
    range: 'Jul 2025 → Mar 2026',
    duration: '9 months',
  },
  {
    num: 'EP.03',
    start: 'Mar 2026',
    title: 'Java Full Stack Developer',
    arc: 'Thomson Digital · The document AI arc',
    arcKana: '文書AI編',
    points: [
      { lead: 'Architected and delivered UniSec end to end', text: ': modular Java 17 and Spring Boot microservices with reactive Angular dashboards.' },
      { text: 'Engineered the PDF-to-XML parsing engine that replaced manual processing and cut turnaround by over 70%.' },
      { text: 'Implemented Java-based RAG in the Spring Boot backend for context-aware semantic parsing; integrated GROBID for structure and metadata.' },
      { text: 'Wrote regex and normalization routines for schema-validated, error-free XML across publishing formats.' },
    ],
    range: 'Mar 2026 → Aug 2026',
    duration: '6 months',
  },
];

export const SKILLS: { group: string; items: { name: string; core?: boolean }[] }[] = [
  { group: 'Languages', items: [{ name: 'Java 8 / 11 / 17', core: true }, { name: 'TypeScript', core: true }, { name: 'JavaScript ES6+' }, { name: 'SQL' }] },
  {
    group: 'Backend',
    items: [
      { name: 'Spring Boot', core: true }, { name: 'Microservices', core: true }, { name: 'REST APIs', core: true },
      { name: 'Spring MVC' }, { name: 'Spring Security' }, { name: 'Spring Batch' }, { name: 'Hibernate / JPA' },
      { name: 'OAuth2' }, { name: 'JWT' }, { name: 'Multithreading' }, { name: 'Design patterns' },
    ],
  },
  { group: 'Messaging', items: [{ name: 'Kafka', core: true }, { name: 'ActiveMQ' }] },
  {
    group: 'Frontend',
    items: [
      { name: 'Angular', core: true }, { name: 'RxJS', core: true }, { name: 'React' }, { name: 'Tailwind CSS' }, { name: 'Vite' },
      { name: 'HTML5' }, { name: 'CSS3' }, { name: 'Bootstrap' }, { name: 'Thymeleaf' }, { name: 'JSP' }, { name: 'AJAX' }, { name: 'jQuery' },
    ],
  },
  { group: 'AI & parsing', items: [{ name: 'Java-based RAG', core: true }, { name: 'GROBID', core: true }, { name: 'Regex' }, { name: 'AI / API integration' }, { name: 'Document automation' }] },
  { group: 'Data & cloud', items: [{ name: 'MySQL', core: true }, { name: 'AWS EC2 / S3', core: true }, { name: 'IBM DB2' }, { name: 'Docker' }, { name: 'Tomcat' }, { name: 'Jetty' }] },
  {
    group: 'DevOps & testing',
    items: [
      { name: 'JUnit 5', core: true }, { name: 'Mockito', core: true }, { name: 'Git', core: true }, { name: 'Maven' }, { name: 'Bamboo' },
      { name: 'Bitbucket' }, { name: 'Jira' }, { name: 'Swagger / OpenAPI' }, { name: 'Postman' }, { name: 'CheckMarx' }, { name: 'GitHub Copilot' },
    ],
  },
];

export const RECORDS = [
  { value: '300', sup: '+', label: 'LeetCode', note: '150+ medium. Usually 2–3 of 4 in contests.' },
  { value: '5', sup: '★', label: 'HackerRank', note: 'Java and Problem Solving. 150+ solved.' },
  { value: 'Top 7', sup: '%', label: 'GATE', note: 'All-India rank among roughly 1 lakh candidates.' },
] as const;

export const CERTIFICATIONS = [
  { name: 'Infosys Certified Spring Boot Developer' },
  { name: 'Infosys Certified Java SE8 Developer' },
  { name: 'Java Backend Developer', by: 'GeeksforGeeks' },
  { name: 'Java (Basic)', by: 'HackerRank' },
] as const;

export const EDUCATION = [
  { name: 'B.Tech, Electrical & Electronics Engineering', detail: 'JSS Academy of Technical Education, Noida · 2016–2020 · 75.6%' },
  { name: 'Class XII', detail: 'Regency Public School, Sitapur · 2015 · 84.2%' },
  { name: 'Class X', detail: 'Sumitra Modern School, Sitapur · 2013 · 83.6%' },
] as const;
