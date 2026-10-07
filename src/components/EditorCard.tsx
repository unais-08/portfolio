import { site } from '../data/site'

export function EditorCard() {
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
