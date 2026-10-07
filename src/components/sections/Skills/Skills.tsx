import { skills } from '../../../data/site'
import { SectionLabel } from '../../ui/SectionLabel'
import './Skills.css'

export function SkillsSection() {
  return <section className="skills section">
    <SectionLabel number="02">Engineering Toolkit</SectionLabel>
    <div className="skills-grid">{skills.map(({ category, items }) => <div className="skill-group" key={category}><h3>{category}</h3><div className="skill-items">{items.map((item) => <span className="skill-item" key={item}><i aria-hidden="true">{item.slice(0, 2).toUpperCase()}</i>{item}</span>)}</div></div>)}</div>
  </section>
}
