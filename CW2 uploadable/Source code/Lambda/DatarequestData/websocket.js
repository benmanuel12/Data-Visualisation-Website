let AWS = require("aws-sdk");

//Import functions for database
let db = require('database');

module.exports.sendMessage = async(type, connID, domainName, stage) => {
    console.log("Gathering data");
    //Create API Gateway management class.
    let apigwManagementApi = new AWS.ApiGatewayManagementApi({
        endpoint: domainName + "/" + stage
    });
    
    let count = 50;

    try {
        let DataArray = [];
        if (type == "numerical") {
            let ArmaghData = await db.getNumericalData(count, "Armagh");
            let BraemarData = await db.getNumericalData(count, "Braemar");
            let CamborneData = await db.getNumericalData(count, "Camborne");
            let DurhamData = await db.getNumericalData(count, "Durham");
            let HeathrowData = await db.getNumericalData(count, "Heathrow");

            DataArray.push(ArmaghData, BraemarData, CamborneData, DurhamData, HeathrowData);
        }
        else if (type == "prediction") {
            let ArmaghPredicts = await db.getSageMakerData(count, "Armagh");
            let BraemarPredicts = await db.getSageMakerData(count, "Braemar");
            let CambornePredicts = await db.getSageMakerData(count, "Camborne");
            let DurhamPredicts = await db.getSageMakerData(count, "Durham");
            let HeathrowPredicts = await db.getSageMakerData(count, "Heathrow");

            DataArray.push(ArmaghPredicts, BraemarPredicts, CambornePredicts, DurhamPredicts, HeathrowPredicts);
        }
        else if (type == "sentiment") {
            let ArmaghSentiment = await db.getSentimentData("Armagh");
            let BraemarSentiment = await db.getSentimentData("Braemar");
            let CamborneSentiment = await db.getSentimentData("Camborne");
            let DurhamSentiment = await db.getSentimentData("Durham");
            let HeathrowSentiment = await db.getSentimentData("Heathrow");

            DataArray.push(ArmaghSentiment, BraemarSentiment, CamborneSentiment, DurhamSentiment, HeathrowSentiment);
        }

        console.log("setting up gateway");
        //Create parameters for API Gateway
        let apiMsg = {
            ConnectionId: connID,
            Data: JSON.stringify([DataArray, "request", type]),
        };

        console.log("posting");
        //Wait for API Gateway to execute and log result
        await apigwManagementApi.postToConnection(apiMsg).promise();


    }
    catch (err) {
        //Delete connection ID from database
        if (err.statusCode == 410) {
            try {
                await db.deleteConnectionId(connID);
            }
            catch (err) {
                throw err;
            }
        }
        else {
            throw err;
        }
    }
};
