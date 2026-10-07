export type Project = {
  slug: string
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string | null
  problem: string
  why: string
  how: string
  architecture: string[]
  features: string[]
  decisions: string[]
  tradeoffs: string[]
  learnings: string[]
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
    slug: 'async-job-queue',
    number: '01',
    title: 'Async Job Queue',
    category: 'Backend systems',
    description: 'A focused exploration of reliable background processing, workers, and job lifecycle design.',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/unais-08',
    liveUrl: null,
    problem: 'Long-running work should not block an API request. This project explores how to accept work quickly, process it asynchronously, and make its state observable.',
    why: 'Queues are a useful boundary between an application and work that can happen later. Building one makes retries, failure handling, and delivery guarantees concrete.',
    how: 'An API writes a job to durable storage. Workers claim available jobs, process them, and update the lifecycle state. Failed work can be retried without losing the original request.',
    architecture: ['Client', 'API', 'Queue', 'Worker', 'Database'],
    features: ['Explicit job lifecycle states', 'Worker-based processing model', 'Retry and failure boundaries', 'Durable job records'],
    decisions: ['Keep the first version database-backed to make state transitions easy to inspect.', 'Keep workers independent from the API so processing can scale separately.'],
    tradeoffs: ['A database queue is simpler to reason about but is not a replacement for a specialized broker at high throughput.', 'At-least-once processing requires idempotent jobs.'],
    learnings: ['Asynchronous systems move complexity from request time into coordination and failure handling.', 'A clear state model is often more valuable than a clever abstraction.'],
  },
  {
    slug: 'distributed-file-system',
    number: '02',
    title: 'Distributed File System',
    category: 'Distributed systems',
    description: 'A study in splitting storage responsibilities across nodes while keeping the client experience understandable.',
    technologies: ['TypeScript', 'Node.js', 'REST APIs'],
    githubUrl: 'https://github.com/unais-08',
    liveUrl: null,
    problem: 'A single storage process creates a natural limit for availability and capacity. This project looks at how a coordinator can route file operations across storage nodes.',
    why: 'Distributed storage exposes the trade-offs behind concepts like replication, node membership, and consistency better than a diagram alone.',
    how: 'A coordinator accepts client operations and maintains the view of available nodes. Storage nodes handle the data plane while the coordinator handles placement and routing.',
    architecture: ['Client', 'Coordinator', 'Node A', 'Node B', 'Node C'],
    features: ['Coordinator and storage-node boundary', 'Node-aware file routing', 'Simple metadata ownership model', 'HTTP interfaces between services'],
    decisions: ['Use explicit service boundaries before introducing more advanced consensus or replication.', 'Keep metadata visible so the system is easy to reason about while learning.'],
    tradeoffs: ['A coordinator is a clear starting point but introduces a central dependency.', 'Simple replication improves resilience at the cost of storage and write complexity.'],
    learnings: ['Distributed systems are mostly about making failure and ownership explicit.', 'The consistency model should be a deliberate product decision, not an accidental implementation detail.'],
  },
  {
    slug: 'load-balancer',
    number: '03',
    title: 'Load Balancer',
    category: 'Networking',
    description: 'A small systems project exploring request distribution, health, and the practical shape of a proxy.',
    technologies: ['TypeScript', 'Node.js', 'HTTP'],
    githubUrl: 'https://github.com/unais-08',
    liveUrl: null,
    problem: 'Sending every request to one service instance limits resilience. A load balancer can distribute traffic and avoid instances that are no longer healthy.',
    why: 'The project is a compact way to understand how routing decisions, failure detection, and backpressure interact at the edge of a system.',
    how: 'The proxy receives a request, selects an available upstream using a simple balancing strategy, forwards the request, and reports upstream failures to its health state.',
    architecture: ['Client', 'Load balancer', 'Service A', 'Service B', 'Service C'],
    features: ['Round-robin routing', 'Upstream health checks', 'Proxy request forwarding', 'Failure-aware selection'],
    decisions: ['Start with round-robin because its behavior is observable and deterministic.', 'Keep health state local to make the first iteration small and testable.'],
    tradeoffs: ['Local health state can differ between balancer instances.', 'Round-robin does not account for request cost or current upstream load.'],
    learnings: ['A small proxy makes networking concerns tangible.', 'Operational behavior is part of the design, not just an afterthought.'],
  },
]

export const skills = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { category: 'Database', items: ['PostgreSQL'] },
  { category: 'Engineering', items: ['Distributed Systems', 'Async Processing', 'API Design', 'System Design'] },
]
