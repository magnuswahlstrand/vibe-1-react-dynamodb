'use client'

import { useState, useEffect } from 'react'
import { addComment, getComments } from './actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [text, setText] = useState('')
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [lastKey, setLastKey] = useState<string | undefined>()
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const loadComments = async (reset = false) => {
    if (reset) {
      setLoadingMore(true)
      const result = await getComments()
      setComments(result.items)
      setLastKey(result.lastEvaluatedKey)
      setHasMore(!!result.lastEvaluatedKey)
      setLoadingMore(false)
    } else {
      setLoadingMore(true)
      const result = await getComments(lastKey)
      setComments(prev => [...prev, ...result.items])
      setLastKey(result.lastEvaluatedKey)
      setHasMore(!!result.lastEvaluatedKey)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    loadComments(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    
    setLoading(true)
    try {
      const id = await addComment(text)
      const newComment = {
        id,
        text,
        createdAt: new Date().toISOString()
      }
      setComments(prev => [newComment, ...prev])
      setText('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Enter your comment..."
          className="mb-2"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Comment'}
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{comment.text}</p>
            </CardContent>
          </Card>
        ))}
        
        {hasMore && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => loadComments()} 
              disabled={loadingMore}
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
