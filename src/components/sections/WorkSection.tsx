import { projects } from '../../data/site'
import { ProjectCard } from '../ui/ProjectCard'
import { SectionLabel } from '../ui/SectionLabel'

export function WorkSection() {
  return <section className="work section" id="work">
    <SectionLabel number="01">Selected work</SectionLabel>
    <div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
    <p className="small-note">More experiments in progress <span>↗</span></p>
  </section>
}
