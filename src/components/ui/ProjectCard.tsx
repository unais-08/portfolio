import type { Project } from '../../data/site'
import { Arrow } from './Arrow'

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <div className="project-card-top"><span>{project.number}</span><span>{project.category}</span></div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
    <div className="project-card-actions">
      {project.liveUrl ? <a className="card-link" href={project.liveUrl} target="_blank" rel="noreferrer">Visit <Arrow /></a> : <span className="card-link is-disabled" aria-label="Live project unavailable">Visit unavailable</span>}
      <a className="card-link" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
    </div>
  </article>
}
