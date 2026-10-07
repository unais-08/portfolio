import '../hero.css'

type HeroProps = {
    site: { name: string; role: string; focus: string[]; github: string }
}

const focus = [
    { title: 'Backend systems', text: 'APIs, queues, and workers that handle failure on purpose.' },
    { title: 'Distributed thinking', text: 'Coordination, health checks, and trade-offs across nodes.' },
    { title: 'Useful interfaces', text: 'React and Next.js front ends that stay simple to use.' },
]

// Minimal JSON highlighter: keys, strings, booleans
const highlight = (line: string) =>
    line.split(/("[^"]*":?|true|false)/g).map((part, i) => {
        if (part.endsWith('":')) return <span className="tk-key" key={i}>{part}</span>
        if (part.startsWith('"')) return <span className="tk-str" key={i}>{part}</span>
        if (part === 'true' || part === 'false') return <span className="tk-bool" key={i}>{part}</span>
        return part
    })

export default function Hero({ site }: HeroProps) {
    const lines = JSON.stringify(
        {
            name: site.name,
            role: site.role,
            focus: site.focus,
            learning: 'Distributed Systems',
            open_to: ['SDE', 'Full-Stack'],
            // relocate: true,
            available: true,
        },
        null,
        2,
    ).split('\n')

    return (
        <section className="hero hero-v2">
            <div className="hv2-grid">
                <div className="hv2-copy">
                    <p className="hv2-status">
                        <span className="status-dot" />
                        <b>{site.role}</b> available for thoughtful work
                    </p>
                    <h1>
                        I build software that is <mark>simple on the surface</mark> and thoughtful underneath.
                    </h1>
                    <p className="hv2-lede">
                        Computer Engineering graduate focused on full-stack and backend engineering, APIs, and the systems that
                        make products reliable.
                    </p>
                    <div className="hero-actions">
                        <a className="button button-dark" href="#work">View my work <span aria-hidden="true">↗</span></a>
                        <a className="text-link" href={site.github}>GitHub <span aria-hidden="true">↗</span></a>
                    </div>
                </div>

                <div className="hv2-visual">
                    <figure className="hv2-card" aria-label={`${site.name} developer profile`}>
                        <div className="hv2-bar">
                            <i /><i /><i />
                            <small>profile.json</small>
                        </div>
                        <pre className="hv2-code">
                            <code>
                                {lines.map((line, i) => (
                                    <span className="hv2-line" key={i}>
                                        {highlight(line)}
                                        {i === lines.length - 1 && <span className="hv2-caret" aria-hidden="true" />}
                                    </span>
                                ))}
                            </code>
                        </pre>
                        <div className="hv2-foot">
                            <span>JSON</span>
                            <span><i />Open to SDE and full-stack roles</span>
                        </div>
                    </figure>
                    <span className="hv2-note">currently learning → distributed systems</span>
                </div>
            </div>

            <div className="hv2-focus">
                {focus.map((item) => (
                    <div className="hv2-focus-item" key={item.title}>
                        <strong>{item.title}</strong>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}