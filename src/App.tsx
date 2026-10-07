import { useEffect } from 'react'
import { Arrow } from './components/Arrow'
import HeroSection from './components/Hero'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ProjectCard } from './components/ProjectCard'
import { SectionLabel } from './components/SectionLabel'
import { projects, site, skills } from './data/site'

function Home() {
  useEffect(() => {
    document.title = 'Unais — Software Engineer'
  }, [])

  return (
    <>
      {/* Header section */}
      <Header />

      <main>
        {/* Hero section */}
        <HeroSection site={site} />

        {/* Work section */}
        <section className="work section" id="work">
          <SectionLabel number="01">Selected work</SectionLabel>

          <div className="section-intro">
            <h2>
              Projects
              <br />
              <em>where the thinking shows.</em>
            </h2>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
              />
            ))}
          </div>

          <p className="small-note">
            More experiments in progress <span>↗</span>
          </p>
        </section>

        {/* Skills section */}
        <section className="skills section">
          <SectionLabel number="02">Tools & interests</SectionLabel>

          <div className="skills-grid">
            {skills.map(({ category, items }) => (
              <div className="skill-group" key={category}>
                <h3>{category}</h3>

                <div className="skill-items">
                  {items.map((item) => (
                    <span className="skill-item" key={item}>
                      <i aria-hidden="true">
                        {item.slice(0, 2).toUpperCase()}
                      </i>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About section */}
        <section className="about section" id="about">
          <SectionLabel number="03">A little about me</SectionLabel>

          <div className="about-grid">
            <h2>
              Early in my career.
              <br />
              <em>Serious about the craft.</em>
            </h2>

            <div className="about-copy">
              <p>
                I’m Unais, a Computer Engineering graduate building a
                foundation in software engineering through projects that make
                me think carefully about data, APIs, and failure.
              </p>

              <p>
                My current focus is full-stack and backend development. I’m
                especially interested in distributed systems, asynchronous
                processing, system design, and the fundamentals that help
                software stay understandable as it grows.
              </p>

              <p className="handwritten">
                still learning, still building.
              </p>
            </div>
          </div>
        </section>

        {/* Journey section */}
        <section className="journey section">
          <SectionLabel number="04">
            Education & journey
          </SectionLabel>

          <div className="journey-row">
            <strong>2021-2025</strong>

            <div>
              <h3>Bachelor of Technology in Computer Engineering</h3>
              <p>
                Dr. Babasaheb Ambedkar Technological University, Lonere, India
              </p>
            </div>
          </div>


        </section>

        {/* Contact section */}
        <section className="contact section" id="contact">
          <SectionLabel number="05">
            Have an opportunity
            <br />
            or interesting problem?
          </SectionLabel>

          <div className="contact-content">
            <h2>
              Let’s connect <em>→</em>
            </h2>

            <a
              className="contact-email"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>

            <div className="social-links">
              <a href={site.github}>
                GitHub <Arrow />
              </a>

              <a href={site.linkedin}>
                LinkedIn <Arrow />
              </a>

              <a href={site.resume}>
                Resume <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function ProjectDetail({
  project,
}: {
  project: (typeof projects)[number]
}) {
  useEffect(() => {
    document.title = `${project.title} — Unais`
  }, [project.title])

  const blocks: [string, string | string[]][] = [
    ['Overview', project.description],
    ['Problem', project.problem],
    ['Why I built it', project.why],
    ['How it works', project.how],
    ['Key features', project.features],
    ['Technical decisions', project.decisions],
    ['Trade-offs', project.tradeoffs],
    ['What I learned', project.learnings],
  ]

  return (
    <>
      <Header detail />

      <main className="detail-page">
        <a className="back-link" href="/">
          ← Back home
        </a>

        <div className="detail-heading">
          <span className="eyebrow">
            {project.number} / {project.category}
          </span>

          <h1>{project.title}</h1>

          <p>{project.description}</p>

          <div className="tag-list">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>

        <div className="detail-layout">
          <aside>
            <span className="aside-label">On this page</span>

            {blocks.map(([title]) => (
              <a
                href={`#${title.toLowerCase().replaceAll(' ', '-')}`}
                key={title}
              >
                {title}
              </a>
            ))}
          </aside>

          <div className="detail-content">
            {blocks.map(([title, content]) => (
              <section
                id={title.toLowerCase().replaceAll(' ', '-')}
                className="detail-section"
                key={title}
              >
                <h2>{title}</h2>

                {Array.isArray(content) ? (
                  <ul>
                    {content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{content}</p>
                )}

                {title === 'How it works' && (
                  <div className="architecture">
                    {project.architecture.map((node, index) => (
                      <span key={node}>
                        {node}

                        {index < project.architecture.length - 1 && (
                          <b>↓</b>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <div className="detail-actions">
          <a
            className="button button-dark"
            href={project.githubUrl}
          >
            View on GitHub <Arrow />
          </a>

          <a className="text-link" href="/">
            All work <Arrow />
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <>
      <Header />

      <main className="not-found">
        <span className="eyebrow">404</span>

        <h1>This page doesn’t exist.</h1>

        <a className="button button-dark" href="/">
          ← Back home
        </a>
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  const slug = window.location.pathname.startsWith('/projects/')
    ? window.location.pathname.split('/')[2]
    : null

  const project = projects.find(
    (item) => item.slug === slug
  )

  if (window.location.pathname !== '/' && !project) {
    return <NotFound />
  }

  return project ? (
    <ProjectDetail project={project} />
  ) : (
    <Home />
  )
}