"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putWeather = void 0;
function putWeather(dataArray) {
    var AWS = require("aws-sdk");
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });
    var _loop_1 = function (i) {
        var documentClient = new AWS.DynamoDB.DocumentClient();
        // console.log("tmax: " + typeof(dataArray[0].getTmax()));
        // console.log("tmin: " + typeof(dataArray[0].getTmin()));
        // console.log(dataArray[0])
        var params = {
            TableName: "WeatherData",
            Item: {
                Location: dataArray[i].getLocation(),
                ObservationTime: dataArray[i].getTimestamp(),
                MaxMeanTemp: dataArray[i].getTmax(),
                MinMeanTemp: dataArray[i].getTmin()
            }
        };
        // let result: any = await documentClient.put(params).promise()
        // console.log(result)
        documentClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add item");
                console.error("Error JSON:", JSON.stringify(err));
            }
            else {
                console.log("Weather added to table:", params.Item);
            }
        });
    };
    for (var i = 0; i < dataArray.length; i++) {
        _loop_1(i);
    }
}
exports.putWeather = putWeather;
