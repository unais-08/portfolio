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
  name: 'Unais',
  role: 'Software Engineer',
  description: 'Software engineer focused on building thoughtful full-stack and backend systems.',
  focus: ['Backend', 'Full-Stack', 'Distributed Systems'],
  email: 'YOUR_EMAIL',
  github: 'https://github.com/unais-08',
  linkedin: 'YOUR_LINKEDIN',
  resume: 'YOUR_RESUME',
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Async Job Queue',
    category: 'Backend systems',
    description: 'A focused exploration of reliable background processing, workers, and job lifecycle design.',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/unais-08',
    liveUrl: null,
  },
  {
    number: '02',
    title: 'Distributed File System',
    category: 'Distributed systems',
    description: 'A study in splitting storage responsibilities across nodes while keeping the client experience understandable.',
    technologies: ['TypeScript', 'Node.js', 'REST APIs'],
    githubUrl: 'https://github.com/unais-08',
    liveUrl: null,
  },
  {
    number: '03',
    title: 'Load Balancer',
    category: 'Networking',
    description: 'A small systems project exploring request distribution, health, and the practical shape of a proxy.',
    technologies: ['TypeScript', 'Node.js', 'HTTP'],
    githubUrl: 'https://github.com/unais-08',
    liveUrl: null,
  },
]

export const skills = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { category: 'Database', items: ['PostgreSQL'] },
  { category: 'Engineering', items: ['Distributed Systems', 'Async Processing', 'API Design', 'System Design'] },
]
