'use server'

import { dynamoDB } from '@/lib/dynamodb'
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { ulid } from 'ulid'

export async function addComment(text: string) {
  const id = ulid()
  await dynamoDB.send(
    new PutCommand({
      TableName: 'comments',
      Item: {
        id,
        text,
        createdAt: new Date().toISOString()
      }
    })
  )
  return id
}

export async function getComments() {
  const result = await dynamoDB.send(
    new ScanCommand({
      TableName: 'comments'
    })
  )
  return result.Items || []
} 