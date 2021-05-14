let AWS = require("aws-sdk");

module.exports.getConnectionIDs = async() => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "WebSocketClients"
        };
        return documentClient.scan(params).promise();
    } catch (err) {
        throw err;
    }
};

module.exports.deleteConnectionId = async(connectionID) => {
    try {
        console.log("Deleting connection ID: " + connectionID);
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "WebSocketClients",
            Key: {
                ConnectionID: connectionID
            }
        };
        return documentClient.delete(params).promise();
    } catch (err) {
        throw err;
    }
};


// get data in reverse
// scanindexForward false
module.exports.getData = async ()=>{
        //HARD CODED COUNT - NUMBER OF ITEMS
        let count = 5;
        
        let numericalDataArray = [];
        let ArmaghData = await getNumericalData(count, "Armagh");
        let BraemarData = await getNumericalData(count, "Braemar");
        let CamborneData = await getNumericalData(count, "Camborne");
        let DurhamData = await getNumericalData(count, "Durham");
        let HeathrowData = await getNumericalData(count, "Heathrow");
        
        numericalDataArray.push(ArmaghData, BraemarData, CamborneData, DurhamData, HeathrowData);
        
        let SageMakerArray = [];
        let ArmaghPredicts = await getSageMakerData(count, "Armagh");
        let BraemarPredicts = await getSageMakerData(count, "Braemar");
        let CambornePredicts = await getSageMakerData(count, "Camborne");
        let DurhamPredicts = await getSageMakerData(count, "Durham");
        let HeathrowPredicts = await getSageMakerData(count, "Heathrow");
        
        SageMakerArray.push(ArmaghPredicts, BraemarPredicts, CambornePredicts, DurhamPredicts, HeathrowPredicts);
        
        let sentimentDataArray = [];
        let ArmaghSentiment = await getSentimentData(count, "Armagh");
        let BraemarSentiment = await getSentimentData(count, "Braemar");
        let CamborneSentiment = await getSentimentData(count, "Camborne");
        let DurhamSentiment = await getSentimentData(count, "Durham");
        let HeathrowSentiment = await getSentimentData(count, "Heathrow");
        
        sentimentDataArray.push(ArmaghSentiment, BraemarSentiment, CamborneSentiment, DurhamSentiment, HeathrowSentiment);
        
        let responseArray = [numericalDataArray, SageMakerArray, sentimentDataArray];
        return responseArray;

}

// Get numerical data to Clients

let getNumericalData = async(count, location) => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "WeatherData",
            Limit: count,
            KeyConditionExpression: '#loc = :location',
            ExpressionAttributeValues: { ':location': location},
            ExpressionAttributeNames: { '#loc': "Location"},
            ScanIndexForwards: false
        };
        return documentClient.query(params).promise();
    } catch (err) {
        console.log(err);
    }
};
let getSageMakerData = async(count, location) => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "SageMakerResults",
            IndexName: "Location-index",
            Limit: count,
            KeyConditionExpression: '#loc = :location',
            ExpressionAttributeValues: { ':location': location},
            ExpressionAttributeNames: { '#loc': "Location"},
            ScanIndexForwards: false
        };
        return documentClient.query(params).promise();
    } catch (err) {
        console.log(err);
    }
};

// Get sentiment data to Clients
let getSentimentData = async(count, location) => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "SentimentResults",
            IndexName: "Location-index",
            Limit: count,
            KeyConditionExpression: '#loc = :location',
            ExpressionAttributeValues: { ':location': location},
            ExpressionAttributeNames: { '#loc': "Location"},
            ScanIndexForwards: false
        };


        return documentClient.query(params).promise();
    } catch (err) {
        throw err;
    }
};