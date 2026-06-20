import { useState } from 'react'
import type { ResumeData, WorkExperience, WorkRole, Education } from '../types/resume'

interface Props {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="px-6 py-2.5 bg-gray-50 border-y border-gray-100">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{title}</h2>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {children}
    </div>
  )
}

const input = 'w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-300 text-gray-800'
const textarea = `${input} resize-none`

export default function ResumeForm({ data, onChange }: Props) {
  const [skillInput, setSkillInput] = useState('')
  const [stackInputs, setStackInputs] = useState<Record<string, string>>({})

  const set = (key: keyof ResumeData, value: ResumeData[keyof ResumeData]) =>
    onChange({ ...data, [key]: value })

  // ── Skills ──────────────────────────────────────────
  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !data.skills.includes(s)) {
      set('skills', [...data.skills, s])
      setSkillInput('')
    }
  }
  const removeSkill = (skill: string) =>
    set('skills', data.skills.filter(s => s !== skill))

  // ── Stack tags per role ──────────────────────────────
  const addStack = (expId: string, roleId: string) => {
    const val = (stackInputs[roleId] || '').trim()
    if (!val) return
    const role = data.workExperience.find(e => e.id === expId)?.roles.find(r => r.id === roleId)
    if (!role) return
    if (!role.stack.includes(val)) patchRole(expId, roleId, 'stack', [...role.stack, val])
    setStackInputs(p => ({ ...p, [roleId]: '' }))
  }
  const removeStack = (expId: string, roleId: string, tech: string) => {
    const role = data.workExperience.find(e => e.id === expId)?.roles.find(r => r.id === roleId)
    if (!role) return
    patchRole(expId, roleId, 'stack', role.stack.filter(s => s !== tech))
  }

  // ── Work experience ──────────────────────────────────
  const patchExp = (expId: string, key: keyof WorkExperience, value: WorkExperience[keyof WorkExperience]) =>
    set('workExperience', data.workExperience.map(e => (e.id === expId ? { ...e, [key]: value } : e)))

  const addExp = () =>
    set('workExperience', [
      ...data.workExperience,
      {
        id: Date.now().toString(),
        company: '',
        location: '',
        roles: [{ id: `${Date.now()}-r`, role: '', startDate: '', endDate: '', current: false, description: '', stack: [] }],
      },
    ])

  const removeExp = (expId: string) =>
    set('workExperience', data.workExperience.filter(e => e.id !== expId))

  // ── Roles within an experience ────────────────────────
  const patchRole = (expId: string, roleId: string, key: keyof WorkRole, value: WorkRole[keyof WorkRole]) =>
    set(
      'workExperience',
      data.workExperience.map(e =>
        e.id === expId
          ? { ...e, roles: e.roles.map(r => (r.id === roleId ? { ...r, [key]: value } : r)) }
          : e,
      ),
    )

  const addRole = (expId: string) =>
    set(
      'workExperience',
      data.workExperience.map(e =>
        e.id === expId
          ? {
              ...e,
              roles: [
                ...e.roles,
                { id: `${Date.now()}-r`, role: '', startDate: '', endDate: '', current: false, description: '', stack: [] },
              ],
            }
          : e,
      ),
    )

  const removeRole = (expId: string, roleId: string) =>
    set(
      'workExperience',
      data.workExperience.map(e =>
        e.id === expId ? { ...e, roles: e.roles.filter(r => r.id !== roleId) } : e,
      ),
    )

  // ── Education ─────────────────────────────────────────
  const patchEdu = (id: string, key: keyof Education, value: Education[keyof Education]) =>
    set('education', data.education.map(e => (e.id === id ? { ...e, [key]: value } : e)))

  const addEdu = () =>
    set('education', [
      ...data.education,
      { id: Date.now().toString(), school: '', degree: '', field: '', startDate: '', endDate: '' },
    ])

  const removeEdu = (id: string) =>
    set('education', data.education.filter(e => e.id !== id))

  return (
    <div className="pb-6">
      {/* Personal Info */}
      <SectionHeader title="Personal Info" />
      <div className="px-6 py-4 space-y-3">
        <Field label="Full Name">
          <input className={input} value={data.name} onChange={e => set('name', e.target.value)} placeholder="Your Name" />
        </Field>
        <Field label="Job Title">
          <input className={input} value={data.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Senior Software Engineer" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Location">
            <input className={input} value={data.location} onChange={e => set('location', e.target.value)} placeholder="City, Country" />
          </Field>
          <Field label="Open to Relocate">
            <input className={input} value={data.openToRelocate} onChange={e => set('openToRelocate', e.target.value)} placeholder="e.g. Europe" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Email">
            <input className={input} value={data.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
          </Field>
          <Field label="Phone">
            <input className={input} value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 234 567 890" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Website">
            <input className={input} value={data.website} onChange={e => set('website', e.target.value)} placeholder="yoursite.com" />
          </Field>
          <Field label="LinkedIn">
            <input className={input} value={data.linkedin} onChange={e => set('linkedin', e.target.value)} placeholder="linkedin.com/in/..." />
          </Field>
        </div>
        <Field label="GitHub">
          <input className={input} value={data.github} onChange={e => set('github', e.target.value)} placeholder="github.com/username" />
        </Field>
      </div>

      {/* Summary */}
      <SectionHeader title="Summary" />
      <div className="px-6 py-4">
        <textarea
          className={textarea}
          rows={4}
          value={data.summary}
          onChange={e => set('summary', e.target.value)}
          placeholder="A brief professional summary about you..."
        />
      </div>

      {/* Skills */}
      <SectionHeader title="Skills" />
      <div className="px-6 py-4">
        <div className="flex gap-2 mb-3">
          <input
            className={input}
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }}
            placeholder="Type a skill, press Enter"
          />
          <button onClick={addSkill} className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 whitespace-nowrap">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.skills.map(skill => (
            <span key={skill} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100">
              {skill}
              <button onClick={() => removeSkill(skill)} className="text-indigo-300 hover:text-indigo-600 font-bold leading-none">×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <SectionHeader title="Work Experience" />
      <div className="px-6 py-4 space-y-3">
        {data.workExperience.map((exp, i) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Company header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Experience {i + 1}
              </span>
              <button onClick={() => removeExp(exp.id)} className="text-xs text-red-400 hover:text-red-600">
                Remove
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Company">
                  <input
                    className={input}
                    value={exp.company}
                    onChange={e => patchExp(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </Field>
                <Field label="Location">
                  <input
                    className={input}
                    value={exp.location}
                    onChange={e => patchExp(exp.id, 'location', e.target.value)}
                    placeholder="City, Country"
                  />
                </Field>
              </div>

              {/* Roles */}
              <div className="space-y-3 pt-1">
                {exp.roles.map((role, ri) => (
                  <div key={role.id} className="border border-indigo-100 rounded-md p-3 bg-indigo-50/30 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                        {exp.roles.length > 1 ? `Role ${ri + 1}` : 'Role'}
                      </span>
                      {exp.roles.length > 1 && (
                        <button onClick={() => removeRole(exp.id, role.id)} className="text-xs text-red-400 hover:text-red-600">
                          Remove
                        </button>
                      )}
                    </div>
                    <Field label="Title">
                      <input
                        className={input}
                        value={role.role}
                        onChange={e => patchRole(exp.id, role.id, 'role', e.target.value)}
                        placeholder="e.g. Senior Engineer"
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Start Date">
                        <input
                          className={input}
                          value={role.startDate}
                          onChange={e => patchRole(exp.id, role.id, 'startDate', e.target.value)}
                          placeholder="Jan 2022"
                        />
                      </Field>
                      <Field label="End Date">
                        <input
                          className={`${input} disabled:opacity-40`}
                          value={role.endDate}
                          onChange={e => patchRole(exp.id, role.id, 'endDate', e.target.value)}
                          placeholder="Present"
                          disabled={role.current}
                        />
                      </Field>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={role.current}
                        onChange={e => patchRole(exp.id, role.id, 'current', e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs text-gray-500">Currently in this role</span>
                    </label>
                    <Field label="Description (one line per bullet)">
                      <textarea
                        className={textarea}
                        rows={3}
                        value={role.description}
                        onChange={e => patchRole(exp.id, role.id, 'description', e.target.value)}
                        placeholder={'Achieved X by doing Y.\nLed a team of N people.'}
                      />
                    </Field>
                    <Field label="Tech Stack">
                      <div className="flex gap-2 mb-2">
                        <input
                          className={input}
                          value={stackInputs[role.id] || ''}
                          onChange={e => setStackInputs(p => ({ ...p, [role.id]: e.target.value }))}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addStack(exp.id, role.id) } }}
                          placeholder="Python, React, ... press Enter"
                        />
                        <button onClick={() => addStack(exp.id, role.id)} className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 whitespace-nowrap">
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {role.stack.map(tech => (
                          <span key={tech} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100">
                            {tech}
                            <button onClick={() => removeStack(exp.id, role.id, tech)} className="text-indigo-300 hover:text-indigo-600 font-bold leading-none">×</button>
                          </span>
                        ))}
                      </div>
                    </Field>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addRole(exp.id)}
                className="w-full py-1.5 border border-dashed border-indigo-200 text-indigo-400 text-xs rounded-md hover:border-indigo-400 hover:text-indigo-600 transition-colors"
              >
                + Add Promotion / Role
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addExp}
          className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-400 text-sm rounded-lg hover:border-indigo-300 hover:text-indigo-500 transition-colors"
        >
          + Add Experience
        </button>
      </div>

      {/* Education */}
      <SectionHeader title="Education" />
      <div className="px-6 py-4 space-y-3">
        {data.education.map((edu, i) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                Education {i + 1}
              </span>
              <button onClick={() => removeEdu(edu.id)} className="text-xs text-red-400 hover:text-red-600">
                Remove
              </button>
            </div>
            <Field label="School / University">
              <input className={input} value={edu.school} onChange={e => patchEdu(edu.id, 'school', e.target.value)} placeholder="University Name" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Degree">
                <input className={input} value={edu.degree} onChange={e => patchEdu(edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
              </Field>
              <Field label="Field of Study">
                <input className={input} value={edu.field} onChange={e => patchEdu(edu.id, 'field', e.target.value)} placeholder="Computer Science" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start Year">
                <input className={input} value={edu.startDate} onChange={e => patchEdu(edu.id, 'startDate', e.target.value)} placeholder="2018" />
              </Field>
              <Field label="End Year">
                <input className={input} value={edu.endDate} onChange={e => patchEdu(edu.id, 'endDate', e.target.value)} placeholder="2022" />
              </Field>
            </div>
          </div>
        ))}
        <button
          onClick={addEdu}
          className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-400 text-sm rounded-lg hover:border-indigo-300 hover:text-indigo-500 transition-colors"
        >
          + Add Education
        </button>
      </div>
    </div>
  )
}
