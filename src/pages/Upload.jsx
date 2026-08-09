import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const navigate = useNavigate()

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError('')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate(`/chat/${response.data.document_id}`, {
        state: { filename: response.data.filename }
      })
    } catch (err) {
      setError('Upload failed. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.name.endsWith('.pdf')) setFile(dropped)
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Left panel */}
      <div className="w-1/2 flex flex-col justify-between p-16 bg-gray-900 border-r border-gray-800">
        <div>
          <div className="text-blue-400 text-xs font-mono tracking-widest uppercase mb-8">Legal Intelligence</div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Ask questions.<br />
            Get answers.<br />
            <span className="text-blue-400">From your documents.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Upload any legal contract, agreement, or policy document. Our AI agent reads, understands, and answers your questions — grounded in the actual text.
          </p>
        </div>

        <div className="space-y-4">
          {["Powered by LangGraph multi-step reasoning", "pgvector semantic search + Cohere reranking", "RAGAS evaluated — Context Precision: 1.00"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 flex flex-col justify-center p-16">
        <h2 className="text-2xl font-semibold mb-2">Upload a document</h2>
        <p className="text-gray-400 text-sm mb-8">PDF files only · Contracts, agreements, policies</p>

        <form onSubmit={handleUpload}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center mb-6 transition-colors ${
              dragOver ? 'border-blue-400 bg-blue-400/5' : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {file ? (
                <div>
                  <p className="text-blue-400 font-medium text-lg">{file.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{(file.size / 1024).toFixed(0)} KB · Ready to upload</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-300 text-lg mb-2">Drop your PDF here</p>
                  <p className="text-gray-500 text-sm">or click to browse</p>
                </div>
              )}
            </label>
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Processing document...' : 'Analyze Document →'}
          </button>
        </form>

        <button
          onClick={() => navigate('/metrics')}
          className="mt-6 text-gray-500 text-sm hover:text-gray-300 transition-colors text-center"
        >
          View RAGAS evaluation metrics →
        </button>
      </div>
    </div>
  )
}