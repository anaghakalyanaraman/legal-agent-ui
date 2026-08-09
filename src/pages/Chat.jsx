import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import API_URL from '../config'

export default function Chat() {
  const { documentId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const filename = location.state?.filename || 'Document'
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        question: input,
        document_id: documentId
      })

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.answer,
        question_type: response.data.question_type,
        chunks_used: response.data.chunks_used
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Failed to get response. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Legal Document Chat</h1>
            <p className="text-gray-500 text-sm">{filename}</p>
          </div>
          <button onClick={() => navigate('/')} className="text-blue-500 hover:underline text-sm">
            Upload New Document
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4 h-96 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center mt-24">
              <p className="text-gray-400">Ask questions about your legal document</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-300 cursor-pointer hover:text-gray-400" onClick={() => setInput('What are the termination clauses?')}>
                  "What are the termination clauses?"
                </p>
                <p className="text-sm text-gray-300 cursor-pointer hover:text-gray-400" onClick={() => setInput('Summarize this contract')}>
                  "Summarize this contract"
                </p>
                <p className="text-sm text-gray-300 cursor-pointer hover:text-gray-400" onClick={() => setInput('What are the payment terms?')}>
                  "What are the payment terms?"
                </p>
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
                msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              }`}>
                {msg.content}
                {msg.question_type && (
                  <p className="text-xs mt-1 opacity-60">Type: {msg.question_type} | Chunks: {msg.chunks_used}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-400">
                Analyzing document...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about your legal document..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  )
}