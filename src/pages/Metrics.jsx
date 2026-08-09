import { useNavigate } from 'react-router-dom'

export default function Metrics() {
  const navigate = useNavigate()

  const metrics = {
    context_precision: 1.00,
    answer_relevancy: 0.999,
    faithfulness: "pending (rate limit during eval)",
    questions_evaluated: 5,
    chunks_per_query: 3,
    reranker: "Cohere rerank-english-v3.0"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">RAGAS Evaluation Metrics</h1>
          <button onClick={() => navigate('/')} className="text-blue-500 hover:underline text-sm">
            Back to Upload
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow text-center">
            <p className="text-3xl font-bold text-green-500">1.00</p>
            <p className="text-gray-500 text-sm mt-1">Context Precision</p>
            <p className="text-gray-300 text-xs mt-1">Are retrieved chunks relevant?</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow text-center">
            <p className="text-3xl font-bold text-green-500">0.999</p>
            <p className="text-gray-500 text-sm mt-1">Answer Relevancy</p>
            <p className="text-gray-300 text-xs mt-1">Does answer address the question?</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-bold mb-4">System Configuration</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-gray-500">Embedding Model</td>
                <td className="py-2">all-MiniLM-L6-v2</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-gray-500">Reranker</td>
                <td className="py-2">Cohere rerank-english-v3.0</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-gray-500">LLM</td>
                <td className="py-2">Llama 3.1 8B (Groq)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-gray-500">Chunks per query</td>
                <td className="py-2">3 (after reranking from top 10)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-gray-500">Vector DB</td>
                <td className="py-2">pgvector (PostgreSQL)</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-500">Document Store</td>
                <td className="py-2">MongoDB</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Ablation Study</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b">
                <th className="pb-2">Configuration</th>
                <th className="pb-2">Context Precision</th>
                <th className="pb-2">Answer Relevancy</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Dense only (baseline)</td>
                <td className="py-2 text-yellow-500">0.94</td>
                <td className="py-2 text-yellow-500">0.95</td>
              </tr>
              <tr>
                <td className="py-2">Dense + Cohere reranker</td>
                <td className="py-2 text-green-500">1.00</td>
                <td className="py-2 text-green-500">0.999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}