let AWS = require("aws-sdk");

module.exports.getNumericalData = async(count, location) => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "WeatherData",
            Limit: count,
            KeyConditionExpression: '#loc = :location',
            ExpressionAttributeValues: { ':location': location},
            ExpressionAttributeNames: { '#loc': "Location"},
            ScanIndexForward: false
        };
        return documentClient.query(params).promise();
    } catch (err) {
        console.log(err);
    }
};

module.exports.getSageMakerData = async(count, location) => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "SageMakerResults",
            Limit: count,
            IndexName: "Location-index",
            KeyConditionExpression: '#loc = :location',
            ExpressionAttributeValues: { ':location': location},
            ExpressionAttributeNames: { '#loc': "Location"},
            ScanIndexForward: false
        };
        return documentClient.query(params).promise();
    } catch (err) {
        console.log(err);
    }
};

// Get sentiment data to Clients
module.exports.getSentimentData = async(location) => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "SentimentResults",
            IndexName: "Location-index",
            KeyConditionExpression: '#loc = :location',
            ExpressionAttributeValues: { ':location': location},
            ExpressionAttributeNames: { '#loc': "Location"},
        };


        return documentClient.query(params).promise();
    } catch (err) {
        throw err;
    }
};

module.exports.deleteConnectionID = async (connectionID) => {
    // console.log("Deleting connection ID: " + connectionID);
    try{
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "WebSocketClients",
            Key: {
                ConnectionID: connectionID
            }
        };
        return documentClient.delete(params).promise();
    }
    catch(err){
        // console.log(JSON.stringify(err));
        throw err;
    }
        
    
};