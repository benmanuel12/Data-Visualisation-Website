let AWS = require("aws-sdk");

// Get numerical data to Clients
module.exports.getNumericalData = async(count, location, timestamp) => {
    try {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: "WeatherData",
            Limit: count,
            KeyConditionExpression: '#loc = :location and ObservationTime > :time',
            ExpressionAttributeValues: { ':location': location, ':time': timestamp },
            ExpressionAttributeNames: { '#loc': "Location"},
            ProjectionExpression: "#loc, ObservationTime, MaxMeanTemp, MinMeanTemp"
        };


        return documentClient.query(params).promise();
    } catch (err) {
        throw err;
    }
};