export type Project = {
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
}

export const site = {
  name: 'Shaikh Unais',
  role: 'Software Engineer',
  description:
    'Software engineer focused on building full-stack applications, backend systems, and practical developer-focused solutions.',
  focus: ['Full-Stack', 'Backend', 'System Design'],
  learning: 'AI Engineering',
  open_to: ['Junior Software Engineer', 'Backend developer', 'Full-Stack developer '],
  tech_stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
  email: 'unais.shaikh.dev@gmail.com',
  github: 'https://github.com/unais-08',
  linkedin: 'https://linkedin.com/in/unais-shaikh',
  resume: '/resume_portfolio.pdf',
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'DocsQuery',
    category: 'RAG & Semantic Search',
    description:
      'A full-stack document Q&A application implementing an end-to-end Retrieval-Augmented Generation pipeline for semantic document search and source-grounded answers.',
    technologies: [
      'React',
      'TypeScript',
      'Express.js',
      'Supabase',
      'PgVector',
    ],
    githubUrl: 'https://github.com/unais-08/docs-query-rag',
    liveUrl: 'https://docs-query-rag.vercel.app/',
  },
  {
    number: '02',
    title: 'Event Ticketing',
    category: 'Full-Stack Platform',
    description:
      'A full-stack event management and ticketing platform with role-based access control, ticket purchasing, QR-based check-in, and PostgreSQL persistence.',
    technologies: [
      'React',
      'TypeScript',
      'Express.js',
      'PostgreSQL',
      'JWT',
    ],
    githubUrl: 'https://github.com/unais-08/event-ticketing',
    liveUrl: 'https://event-ticketing-xi.vercel.app/',
  },
  {
    number: '03',
    title: 'AsyncQueue',
    category: 'Backend Systems',
    description:
      'A background job processing system built around a producer-queue-worker architecture with job lifecycle tracking, retries, failure handling, and a Dead Letter Queue.',
    technologies: [
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'Custom Job Queue',
    ],
    githubUrl: 'https://github.com/unais-08/async-queue',
    liveUrl: null,
  },
]

export const skills = [
  {
    category: 'Languages',
    items: ['C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'Redis', 'Supabase'],
  },
  {
    category: 'Tools and Engineering',
    items: ['Git', 'GitHub', 'Linux', 'Distributed Systems', 'Restful Architecture'],
  },
]