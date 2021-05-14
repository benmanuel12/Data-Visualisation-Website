let AWS = require('aws-sdk')

let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event) => {
    let connID = event.requestContext.connectionId;

    let params = {
        TableName: "WebSocketClients",
        Item: {
            ConnectionID: connID
        }
    };

    try {
        await documentClient.put(params).promise();

        return {
            statusCode: 200,
            body: "Client connected with ID: " + connID
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: "Server Error: " + JSON.stringify(err)
        }
    }
};