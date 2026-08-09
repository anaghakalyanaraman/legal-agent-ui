import { useState, useEffect, useRef } from 'react'
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
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const suggestions = [
    "What are the termination clauses?",
    "Summarize this contract",
    "What are the payment terms?",
    "Who are the parties in this agreement?"
  ]

  async function handleSend(question) {
    const q = question || input
    if (!q.trim()) return
    const userMessage = { role: 'user', content: q }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/chat`, {
        question: q,
        document_id: documentId
      })
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.answer,
        question_type: response.data.question_type,
        chunks_used: response.data.chunks_used
      }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to get response. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="text-blue-400 text-xs font-mono tracking-widest uppercase mb-2">Legal Intelligence</div>
          <h2 className="text-sm font-medium text-gray-200 truncate">{filename}</h2>
        </div>

        <div className="p-4 flex-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Try asking</p>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="w-full text-left text-xs text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <button
            onClick={() => navigate('/metrics')}
            className="w-full text-left text-xs text-gray-500 hover:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View RAGAS metrics →
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full text-left text-xs text-gray-500 hover:text-gray-300 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Upload new document →
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-800 flex items-center px-6 gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-sm text-gray-400">Document loaded · {documentId.slice(0, 8)}...</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-500 text-lg mb-2">Document ready</p>
                <p className="text-gray-600 text-sm">Ask a question or pick a suggestion from the sidebar</p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold mr-3 mt-1 flex-shrink-0">A</div>
              )}
              <div className={`max-w-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-100'} px-4 py-3 rounded-xl text-sm leading-relaxed`}>
                {msg.content}
                {msg.question_type && (
                  <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400 flex gap-3">
                    <span>Type: {msg.question_type}</span>
                    <span>Chunks: {msg.chunks_used}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">A</div>
              <div className="bg-gray-800 px-4 py-3 rounded-xl text-sm text-gray-400">
                Analyzing document...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Ask anything about this document..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-30 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}