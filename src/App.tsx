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
      <Header />
      <main>
        <HeroSection site={site} />
        <section className="work section" id="work">
          <SectionLabel number="01">Selected work</SectionLabel>
          <div className="section-intro">
          </div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
          </div>
          <p className="small-note">More experiments in progress <span>↗</span></p>
        </section>

        <section className="skills section">
          <SectionLabel number="02">Engineering Toolkit</SectionLabel>
          <div className="skills-grid">
            {skills.map(({ category, items }) => (
              <div className="skill-group" key={category}>
                <h3>{category}</h3>
                <div className="skill-items">
                  {items.map((item) => <span className="skill-item" key={item}><i aria-hidden="true">{item.slice(0, 2).toUpperCase()}</i>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <SectionLabel number="03">A little about me</SectionLabel>
          <div className="about-grid">
           
            <div className="about-copy">
              <p>I’m Unais, a Computer Engineering graduate focused on backend and full-stack engineering. I enjoy building systems where APIs, data, concurrency, and failure handling have to work together.</p>
              <p>I’m currently looking for opportunities where I can contribute, keep learning from experienced engineers, and grow into a strong software engineer.</p>
              <div className="about-meta"><span>FOCUS</span><strong>BACKEND + FULL-STACK</strong></div>
              <p className="handwritten">Still learning. Still building.</p>
            </div>
          </div>
        </section>
        <section className="contact section" id="contact">
          <SectionLabel number="05">Have an opportunity<br />or interesting problem?</SectionLabel>
          <div className="contact-content">
            <h2>Let’s connect <em>→</em></h2>
            <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
            <div className="social-links">
              <a href={site.github}>GitHub <Arrow /></a>
              <a href={site.linkedin}>LinkedIn <Arrow /></a>
              <a href={site.resume}>Resume <Arrow /></a>
            </div>
          </div>
        </section>
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
        <a className="button button-dark" href="/">← Back home</a>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return window.location.pathname === '/' ? <Home /> : <NotFound />
}
