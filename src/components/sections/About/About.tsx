import { SectionLabel } from '../../ui/SectionLabel'
import './About.css'

export function AboutSection() {
  return <section className="about section" id="about">
    <SectionLabel number="03">A little about me</SectionLabel>

    <div className="about-grid">

      <div className="about-copy">
        <p>I’m Unais, a Computer Engineering graduate focused on backend and full-stack engineering. I enjoy building systems where APIs, data, concurrency, and failure handling have to work together.</p>
        <p>I’m currently looking for opportunities where I can contribute, keep learning from experienced engineers, and grow into a strong software engineer.</p>

        <p className="handwritten">Still learning. Still building.</p>
      </div>
    </div>
  </section>
}
