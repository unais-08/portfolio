import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import './index.css'

type Project = {
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

const site = {
  name: 'Unais',
  role: 'Software Engineer',
  description: 'Software engineer focused on building thoughtful full-stack and backend systems.',
  focus: ['Backend', 'Full-Stack', 'Distributed Systems'],
  email: 'YOUR_EMAIL',
  github: 'https://github.com/unais-08',
  linkedin: 'YOUR_LINKEDIN',
  resume: 'YOUR_RESUME',
}

const projects: Project[] = [
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

const skills: { category: string; items: string[] }[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
  { category: 'Database', items: ['PostgreSQL'] },
  { category: 'Engineering', items: ['Distributed Systems', 'Async Processing', 'API Design', 'System Design'] },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Header({ detail = false }: { detail?: boolean }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="site-header">
      <a className="wordmark" href="/" onClick={close} aria-label="Unais home">U<span>.</span></a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav">
        <span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true">{open ? '×' : '☰'}</i>
      </button>
      <nav id="main-nav" className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <a href={detail ? '/#work' : '#work'} onClick={close}>Work</a>
        <a href={detail ? '/#about' : '#about'} onClick={close}>About</a>
        <a href={detail ? '/#contact' : '#contact'} onClick={close}>Contact</a>
        <a className="nav-contact" href={`mailto:${site.email}`} onClick={close}>Let's talk <Arrow /></a>
      </nav>
    </header>
  )
}

function Footer() {
  return <footer className="site-footer">
    <span>© 2026 Unais</span>
    <div><a href={site.github}>GitHub</a><a href={`mailto:${site.email}`}>Email</a><span>Built with React + TypeScript</span></div>
  </footer>
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>
}

function EditorCard() {
  return <div className="editor-card" aria-label="Unais developer identity card">
    <div className="editor-toolbar"><span /><span /><span /><small>profile.json</small></div>
    <pre className="editor-code"><code>
      <span className="json-punctuation">{'{'}</span>{'\n'}
      {'  '}<span className="json-key">"name"</span><span className="json-punctuation">: </span><span className="json-string">"{site.name}"</span><span className="json-punctuation">,</span>{'\n'}
      {'  '}<span className="json-key">"role"</span><span className="json-punctuation">: </span><span className="json-string">"{site.role}"</span><span className="json-punctuation">,</span>{'\n'}
      {'  '}<span className="json-key">"focus"</span><span className="json-punctuation">: [</span>{'\n'}
      {site.focus.map((item, index) => <span key={item}>{'    '}<span className="json-string">"{item}"</span>{index < site.focus.length - 1 && <span className="json-punctuation">,</span>}{'\n'}</span>)}
      {'  '}<span className="json-punctuation">]</span>{'\n'}
      <span className="json-punctuation">{'}'}</span>
    </code></pre>
  </div>
}

function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <div className="project-card-top"><span>{project.number}</span><span>{project.category}</span></div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
    <a className="card-link" href={`/projects/${project.slug}`}>Read case study <Arrow /></a>
  </article>
}

function Home() {
  useEffect(() => { document.title = 'Unais — Software Engineer' }, [])
  return <><Header /><main>
    <section className="hero">
      <p className="eyebrow">Software Engineer <span className="status-dot" /> available for thoughtful work</p>
      <div className="hero-main"><div className="hero-copy"><h1>I build software that is <em>simple on the surface</em> and thoughtful underneath.</h1>
        <div className="hero-bottom"><p>Computer Engineering graduate focused on full-stack and backend engineering, APIs, and the systems that make products reliable.</p><div className="hero-actions"><a className="button button-dark" href="#work">View my work <Arrow /></a><a className="text-link" href={site.github}>GitHub <Arrow /></a></div></div>
      </div><EditorCard /></div>
      <span className="annotation">currently learning → distributed systems</span>
    </section>
    <section className="work section" id="work">
      <SectionLabel number="01">Selected work</SectionLabel>
      <div className="section-intro"><h2>Projects are where<br /><em>the thinking shows.</em></h2><p>A few explorations in backend engineering and distributed systems. Each one is an opportunity to understand the trade-offs, not just make the feature work.</p></div>
      <div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      <p className="small-note">More experiments in progress <span>↗</span></p>
    </section>
    <section className="about section" id="about">
      <SectionLabel number="02">A little about me</SectionLabel>
      <div className="about-grid"><h2>Early in my career.<br /><em>Serious about the craft.</em></h2><div className="about-copy"><p>I’m Unais, a Computer Engineering graduate building a foundation in software engineering through projects that make me think carefully about data, APIs, and failure.</p><p>My current focus is full-stack and backend development. I’m especially interested in distributed systems, asynchronous processing, system design, and the fundamentals that help software stay understandable as it grows.</p><p className="handwritten">still learning, still building.</p></div></div>
    </section>
    <section className="skills section"><SectionLabel number="03">Tools & interests</SectionLabel><div className="skills-grid">{skills.map(({ category, items }) => <div className="skill-group" key={category}><h3>{category}</h3><div className="skill-items">{items.map((item) => <span className="skill-item" key={item}><i aria-hidden="true">{item.slice(0, 2).toUpperCase()}</i>{item}</span>)}</div></div>)}</div></section>
    <section className="journey section"><SectionLabel number="04">Engineering journey</SectionLabel><div className="journey-row"><strong>2025</strong><div><h3>Computer Engineering Graduate</h3><p>Building a practical foundation in software engineering.</p></div></div><div className="journey-row"><strong>Now</strong><div><h3>Building & learning</h3><p>Strengthening full-stack, backend, and systems thinking through projects.</p></div></div></section>
    <section className="contact section" id="contact"><SectionLabel number="05">Have an opportunity<br />or interesting problem?</SectionLabel><div className="contact-content"><h2>Let’s talk <em>→</em></h2><a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a><div className="social-links"><a href={site.github}>GitHub <Arrow /></a><a href={site.linkedin}>LinkedIn <Arrow /></a><a href={site.resume}>Resume <Arrow /></a></div></div></section>
  </main><Footer /></>
}

function ProjectDetail({ project }: { project: Project }) {
  useEffect(() => { document.title = `${project.title} — Unais` }, [project.title])
  const blocks: [string, string | string[]][] = [['Overview', project.description], ['Problem', project.problem], ['Why I built it', project.why], ['How it works', project.how], ['Key features', project.features], ['Technical decisions', project.decisions], ['Trade-offs', project.tradeoffs], ['What I learned', project.learnings]]
  return <><Header detail /><main className="detail-page"><a className="back-link" href="/">← Back home</a><div className="detail-heading"><span className="eyebrow">{project.number} / {project.category}</span><h1>{project.title}</h1><p>{project.description}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div className="detail-layout"><aside><span className="aside-label">On this page</span>{blocks.map(([title]) => <a href={`#${title.toLowerCase().replaceAll(' ', '-')}`} key={title}>{title}</a>)}</aside><div className="detail-content">{blocks.map(([title, content]) => <section id={title.toLowerCase().replaceAll(' ', '-')} className="detail-section" key={title}><h2>{title}</h2>{Array.isArray(content) ? <ul>{content.map((item) => <li key={item}>{item}</li>)}</ul> : <p>{content}</p>}{title === 'How it works' && <div className="architecture">{project.architecture.map((node, index) => <span key={node}>{node}{index < project.architecture.length - 1 && <b>↓</b>}</span>)}</div>}</section>)}</div></div><div className="detail-actions"><a className="button button-dark" href={project.githubUrl}>View on GitHub <Arrow /></a><a className="text-link" href="/">All work <Arrow /></a></div></main><Footer /></>
}

function NotFound() {
  return <><Header /><main className="not-found"><span className="eyebrow">404</span><h1>This page doesn’t exist.</h1><a className="button button-dark" href="/">← Back home</a></main><Footer /></>
}

export default function App() {
  const slug = window.location.pathname.startsWith('/projects/') ? window.location.pathname.split('/')[2] : null
  const project = projects.find((item) => item.slug === slug)
  if (window.location.pathname !== '/' && !project) return <NotFound />
  return project ? <ProjectDetail project={project} /> : <Home />
}
