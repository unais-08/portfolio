import type { ReactNode } from 'react'

type SocialIconName = 'github' | 'linkedin' | 'email' | 'resume'

export function SocialIcon({ name }: { name: SocialIconName }) {
  const paths: Record<SocialIconName, ReactNode> = {
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-7A5.5 5.5 0 0 0 19 3.6 5.1 5.1 0 0 0 18.9 0S17.7-.4 15 1.6a13.4 13.4 0 0 0-7 0C5.3-.4 4.1 0 4.1 0A5.1 5.1 0 0 0 4 3.6a5.5 5.5 0 0 0-1.3 3.8c0 5.5 3.2 6.7 6.2 7A3.4 3.4 0 0 0 8 17.1V22" /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
    email: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
    resume: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
  }

  return (
    <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
