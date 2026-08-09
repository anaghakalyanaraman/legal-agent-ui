import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
      setError('Failed to upload document. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Legal Document Intelligence</h1>
        <p className="text-gray-500 mb-8">Upload a legal document and ask questions in plain language.</p>

        <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {file ? (
                <p className="text-blue-500 font-medium">{file.name}</p>
              ) : (
                <div>
                  <p className="text-gray-400 mb-1">Click to upload a PDF</p>
                  <p className="text-gray-300 text-sm">Legal contracts, agreements, policies</p>
                </div>
              )}
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Upload & Analyze'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/metrics')}
            className="text-blue-500 text-sm hover:underline"
          >
            View RAGAS Evaluation Metrics →
          </button>
        </div>
      </div>
    </div>
  )
}