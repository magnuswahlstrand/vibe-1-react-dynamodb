import { dynamoDB } from '../lib/dynamodb'
import { DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

async function clearDB() {
  try {
    // Get all items
    const result = await dynamoDB.send(
      new ScanCommand({
        TableName: 'comments',
      })
    )

    if (!result.Items || result.Items.length === 0) {
      console.log('No items to delete')
      return
    }

    // Delete each item
    const deletePromises = result.Items.map(item => 
      dynamoDB.send(
        new DeleteCommand({
          TableName: 'comments',
          Key: {
            id: item.id
          }
        })
      )
    )

    await Promise.all(deletePromises)
    console.log(`Successfully deleted ${result.Items.length} items`)
  } catch (error) {
    console.error('Error clearing database:', error)
  }
}

clearDB() 