import React from 'react'
import type { ResumeData } from '../types/resume'
import '../styles/resume-noir.css'

interface Props {
  data: ResumeData
}

const icons = {
  location: (
    <svg className="noir-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  email: (
    <svg className="noir-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  phone: (
    <svg className="noir-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  ),
  globe: (
    <svg className="noir-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  linkedin: (
    <svg className="noir-contact-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  github: (
    <svg className="noir-contact-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  relocate: (
    <svg className="noir-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
}

function ensureHttp(url: string) {
  if (!url) return '#'
  return url.startsWith('http') ? url : `https://${url}`
}

export default function ResumePreviewNoir({ data }: Props) {
  const contactChips = [
    data.location && <span key="loc" className="noir-contact-chip">{icons.location}{data.location}</span>,
    data.email && <span key="email" className="noir-contact-chip">{icons.email}<a className="noir-contact-link" href={`mailto:${data.email}`}>{data.email}</a></span>,
    data.phone && <span key="phone" className="noir-contact-chip">{icons.phone}<a className="noir-contact-link" href={`tel:${data.phone}`}>{data.phone}</a></span>,
    data.website && <span key="web" className="noir-contact-chip">{icons.globe}<a className="noir-contact-link" href={ensureHttp(data.website)} target="_blank" rel="noreferrer">{data.website}</a></span>,
    data.linkedin && <span key="li" className="noir-contact-chip">{icons.linkedin}<a className="noir-contact-link" href={ensureHttp(data.linkedin)} target="_blank" rel="noreferrer">{data.linkedin}</a></span>,
    data.github && <span key="gh" className="noir-contact-chip">{icons.github}<a className="noir-contact-link" href={ensureHttp(data.github)} target="_blank" rel="noreferrer">{data.github}</a></span>,
  ].filter(Boolean) as React.ReactElement[]

  return (
    <div className="noir-wrapper">
      <div className="noir-container">

        {/* ── Header ── */}
        <div className="noir-header">
          <div className="noir-name">{data.name || 'Your Name'}</div>
          <div className="noir-title">{data.title || 'Your Title'}</div>
          <div className="noir-contact-strip">
            {contactChips.map((chip, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="noir-sep">·</span>}
                {chip}
              </React.Fragment>
            ))}
          </div>
          {data.openToRelocate && (
            <div className="noir-relocate">
              {icons.relocate}
              <span>Open to relocation · {data.openToRelocate}</span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="noir-body">

          {/* Left column */}
          <div className="noir-left">
            {data.summary && (
              <div>
                <div className="noir-section-heading">About</div>
                <p className="noir-summary">{data.summary}</p>
              </div>
            )}

            {data.skills.length > 0 && (
              <div>
                <div className="noir-section-heading">Skills</div>
                <div className="noir-skills-wrap">
                  {data.skills.map(skill => (
                    <span key={skill} className="noir-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div>
                <div className="noir-section-heading">Education</div>
                {data.education.map(edu => (
                  <div key={edu.id} className="noir-edu-item">
                    <div className="noir-edu-school">{edu.school}</div>
                    {(edu.degree || edu.field) && (
                      <div className="noir-edu-degree">{[edu.degree, edu.field].filter(Boolean).join(', ')}</div>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <div className="noir-edu-dates">{edu.startDate}{edu.endDate ? ` – ${edu.endDate}` : ''}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="noir-right">
            {data.workExperience.length > 0 && (
              <>
                <div className="noir-section-heading">Experience</div>
                {data.workExperience.map(exp => (
                  <div key={exp.id} className="noir-exp-item">
                    <div className="noir-exp-header">
                      <span className="noir-exp-company">{exp.company}</span>
                      {exp.location && <span className="noir-exp-location">{exp.location}</span>}
                    </div>
                    {exp.roles.map(role => (
                      <div key={role.id} className="noir-role-entry">
                        <div className="noir-role-meta">
                          <span className="noir-role-title">{role.role}</span>
                          <span className="noir-role-dates">
                            {role.startDate}
                            {(role.startDate || role.endDate || role.current) && ' – '}
                            {role.current ? 'Present' : role.endDate}
                          </span>
                        </div>
                        {role.description && (
                          <div>
                            {role.description.split('\n').filter(l => l.trim()).map((line, i) => (
                              <div key={i} className="noir-bullet">{line.replace(/^[•\-]\s*/, '')}</div>
                            ))}
                          </div>
                        )}
                        {role.stack?.length > 0 && (
                          <div className="noir-stack">
                            {role.stack.map(tech => (
                              <span key={tech} className="noir-stack-tag">{tech}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
