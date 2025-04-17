'use client'

import { useState, useEffect } from 'react'
import { addComment, getComments } from './actions'

export default function Home() {
  const [text, setText] = useState('')
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadComments = async () => {
      const loadedComments = await getComments()
      setComments(loadedComments)
    }
    loadComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    
    setLoading(true)
    try {
      await addComment(text)
      const updatedComments = await getComments()
      setComments(updatedComments)
      setText('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          rows={4}
          placeholder="Enter your comment..."
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Comment'}
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded">
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
