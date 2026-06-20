import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import ResumePreviewNoir from './components/ResumePreviewNoir'
import { defaultResumeData } from './types/resume'
import type { ResumeData } from './types/resume'

type Style = 'indigo' | 'noir'

const styles: { id: Style; label: string; preview: string }[] = [
  { id: 'indigo', label: 'Indigo', preview: '#4f46e5' },
  { id: 'noir', label: 'Noir', preview: '#f59e0b' },
]

export default function App() {
  const [data, setData] = useState<ResumeData>(defaultResumeData)
  const [activeStyle, setActiveStyle] = useState<Style>('indigo')
  const printRef = useRef<HTMLDivElement>(null)
  const importRef = useRef<HTMLInputElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: data.name ? `${data.name} - Resume` : 'Resume',
  })

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(data.name || 'resume').replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        setData(JSON.parse(reader.result as string))
      } catch {
        alert('Could not load file — make sure it is a valid resume JSON.')
      }
      // reset so the same file can be re-imported
      if (importRef.current) importRef.current.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* ── Form panel ── */}
      <div className="w-[420px] flex-shrink-0 flex flex-col h-full border-r border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">Resume Builder</h1>
          <p className="text-xs text-gray-400 mt-0.5">Fill in your details — the preview updates live</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ResumeForm data={data} onChange={setData} />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 space-y-2">
          {/* Save / Load row */}
          <div className="flex gap-2">
            <button
              onClick={() => importRef.current?.click()}
              className="flex-1 py-2 px-3 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Load JSON
            </button>
            <button
              onClick={handleExport}
              className="flex-1 py-2 px-3 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Save JSON
            </button>
          </div>

          {/* Download PDF */}
          <button
            onClick={() => handlePrint()}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input ref={importRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

      {/* ── Preview panel ── */}
      <div className="flex-1 overflow-auto bg-gray-200 flex flex-col items-center py-10 px-6">
        {/* Style switcher */}
        <div className="flex gap-2 mb-6">
          {styles.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveStyle(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                activeStyle === s.id
                  ? 'bg-white border-gray-400 text-gray-900 shadow-sm'
                  : 'bg-white/50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.preview }} />
              {s.label}
            </button>
          ))}
        </div>

        <div ref={printRef}>
          {activeStyle === 'indigo' && <ResumePreview data={data} />}
          {activeStyle === 'noir' && <ResumePreviewNoir data={data} />}
        </div>
      </div>
    </div>
  )
}
