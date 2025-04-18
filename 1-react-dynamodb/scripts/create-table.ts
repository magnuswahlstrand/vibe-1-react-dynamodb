import { dynamoDB } from '../lib/dynamodb'
import { CreateTableCommand } from '@aws-sdk/client-dynamodb'

async function createTable() {
  try {
    await dynamoDB.send(
      new CreateTableCommand({
        TableName: 'comments',
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      })
    )
    console.log('Table created successfully')
  } catch (error) {
    console.error('Error creating table:', error)
  }
}

createTable() 