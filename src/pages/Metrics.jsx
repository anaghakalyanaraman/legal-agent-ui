import { useNavigate } from 'react-router-dom'

export default function Metrics() {
  const navigate = useNavigate()

  const ablation = [
    { config: "Dense only (baseline)", precision: "0.94", relevancy: "0.95", color: "text-yellow-400" },
    { config: "Dense + Cohere reranker", precision: "1.00", relevancy: "0.999", color: "text-green-400" },
  ]

  const stack = [
    { label: "Embedding Model", value: "all-MiniLM-L6-v2" },
    { label: "Vector DB", value: "pgvector (PostgreSQL)" },
    { label: "Document Store", value: "MongoDB" },
    { label: "Reranker", value: "Cohere rerank-english-v3.0" },
    { label: "LLM", value: "Llama 3.1 8B via Groq" },
    { label: "Agent Framework", value: "LangGraph (4-node pipeline)" },
    { label: "Evaluation", value: "RAGAS" },
  ]

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Left */}
      <div className="w-1/2 flex flex-col justify-between p-16 bg-gray-900 border-r border-gray-800">
        <div>
          <div className="text-blue-400 text-xs font-mono tracking-widest uppercase mb-8">Evaluation Results</div>
          <h1 className="text-4xl font-bold mb-6">RAGAS Metrics</h1>
          <p className="text-gray-400 leading-relaxed mb-12">
            Evaluated on a 5-question test set generated from a legal contract. Metrics measure retrieval quality and answer grounding independently.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-800 rounded-xl p-6">
              <p className="text-4xl font-bold text-green-400 mb-1">1.00</p>
              <p className="text-sm text-gray-300 font-medium">Context Precision</p>
              <p className="text-xs text-gray-500 mt-1">Retrieved chunks are relevant</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <p className="text-4xl font-bold text-green-400 mb-1">0.999</p>
              <p className="text-sm text-gray-300 font-medium">Answer Relevancy</p>
              <p className="text-xs text-gray-500 mt-1">Answers address the question</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Ablation Study — Impact of Cohere Reranker</p>
            <div className="space-y-3">
              {ablation.map((row, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
                  <span className="text-sm text-gray-300">{row.config}</span>
                  <div className="flex gap-6 text-sm">
                    <span className={row.color}>CP: {row.precision}</span>
                    <span className={row.color}>AR: {row.relevancy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
          ← Back to upload
        </button>
      </div>

      {/* Right */}
      <div className="w-1/2 flex flex-col justify-center p-16">
        <h2 className="text-2xl font-semibold mb-2">System Architecture</h2>
        <p className="text-gray-400 text-sm mb-8">4-node LangGraph pipeline with semantic retrieval and reranking</p>

        <div className="space-y-3 mb-12">
          {stack.map((item, i) => (
            <div key={i} className="flex justify-between items-center border-b border-gray-800 pb-3">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-sm text-white font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Agent Pipeline</p>
          <div className="flex items-center gap-2 text-sm">
            {["Classify", "Search", "Rerank", "Generate"].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                  {step}
                </div>
                {i < arr.length - 1 && <span className="text-gray-600">→</span>}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 text-gray-500 text-sm hover:text-gray-300 transition-colors"
        >
          ← Back to chat
        </button>
      </div>
    </div>
  )
}