import { useState } from 'react'
import axios from 'axios'

export default function Chat() {
  const [mensagem, setMensagem] = useState("")
  const [respostas, setRespostas] = useState([])

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return
    const novaLista = [...respostas, { tipo: 'user', texto: mensagem }]
    setRespostas(novaLista)
    setMensagem("")

    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL + "/chat/ia", { mensagem })
      setRespostas([...novaLista, { tipo: 'ia', texto: data.resposta }])
    } catch (err) {
      setRespostas([...novaLista, { tipo: 'ia', texto: "Erro ao conectar com a IA." }])
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-4">
      <h1 className="text-2xl font-bold mb-4">VetAI Chatbot</h1>
      <div className="space-y-2 h-96 overflow-y-auto mb-4 border p-2 rounded">
        {respostas.map((msg, i) => (
          <div key={i} className={msg.tipo === 'user' ? 'text-right' : 'text-left'}>
            <span className={`inline-block px-3 py-2 rounded-xl ${msg.tipo === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.texto}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enviarMensagem()}
          className="flex-1 border rounded p-2"
          placeholder="Digite sua mensagem..."
        />
        <button onClick={enviarMensagem} className="bg-blue-500 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </div>
    </div>
  )
}
