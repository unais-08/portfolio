import type { Project } from '../data/site'
import { Arrow } from './Arrow'

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <div className="project-card-top"><span>{project.number}</span><span>{project.category}</span></div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
    <a className="card-link" href={`/projects/${project.slug}`}>Read case study <Arrow /></a>
  </article>
}
