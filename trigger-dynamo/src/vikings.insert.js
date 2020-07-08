const uuid = require('uuid')

class Handler {
    constructor({ dynamoDbSvc }) {
        this.dynamoDbSvc = dynamoDbSvc
        this.dynamoDbTable = process.env.DYNAMODB_TABLE
    }

    async insertItem(params) {
        return this.dynamoDbSvc.put(params).promise()
    }

    prepareData(data) {
        const params = {
            TableName: this.dynamoDbTable,
            Item: {
                ...data,
                id: uuid.v1(),
                createdAt: new Date().toISOString()
            }
        }

        return params
    }

    handlerSuccess(item) {
        const response = {
            statusCode: 200,
            body: JSON.stringify(item)
        }

        return response
    }

    handlerError(item) {
        return {
            statusCode: item.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create item'
        }
    }

    async main(event) {
        try {
            const data = event.body
            const dbParams = this.prepareData(data)
            await this.insertItem(dbParams)

            return this.handlerSuccess(dbParams.Item)

        } catch (error) {
            console.log(error.stack)

            return this.handlerError({ statusCode: 500 })
        }
    }
}

// factory
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()

const handler = new Handler({
    dynamoDbSvc: dynamoDB
})

module.exports = handler.main.bind(handler)