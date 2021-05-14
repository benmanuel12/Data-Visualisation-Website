let AWS = require("aws-sdk");
let awsRuntime = new AWS.SageMakerRuntime({});
let documentClient = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');

// Can't open all 10 endpoints at once so had to do it in 2 halves
// endpoints had to be deleted after use to reduce cost
// David, if you are seeing this on AWS, make new endpoints for each test data and change the names in endpointNameArray if you want to test it

let locationArray = ["Camborne", "Durham", "Heathrow"];
//let fileNameArray = ["ArmaghMaxTest.json", "ArmaghMinTest.json", "BraemarMaxTest.json", "BraemarMinTest.json", "CamborneMaxTest.json"]
let fileNameArray = ["CamborneMinTest.json", "DurhamMaxTest.json", "DurhamMinTest.json", "HeathrowMaxTest.json", "HeathrowMinTest.json"];

let endpointNameArray = ["CamborneMinendpoint", "DurhamMaxendpoint", "DurhamMinendpoint", "HeathrowMaxendpoint", "HeathrowMinendpoint"];
let type = "";

exports.handler = async event => {
    for (let i = 0; i < fileNameArray.length; i++) {
        let rawtestData = fs.readFileSync(fileNameArray[i]);
        let JSONdata = JSON.parse(rawtestData);

        let endpointData = {
            "instances": [{
                "start": JSONdata.start,
                "target": JSONdata.target
            }],
            "configuration": {
                "num_samples": 12,
                "output_types": ["mean"]
            }
        };
        
        // this has to be changed as sometimes odd indexes are max and sometimes min
        // cant open all 10 endpoints at once so the parity changes

        if (i % 2 != 0) {
            type = "Max";
        }
        else {
            type = "Min";
        }

        console.log(JSON.stringify(endpointData));

        const endpointName = endpointNameArray[i];

        let sagemakerparams = {
            EndpointName: endpointName,
            Body: JSON.stringify(endpointData),
            ContentType: "application/json",
            Accept: "application/json"
        };

        let sagemakerResult = await awsRuntime.invokeEndpoint(sagemakerparams).promise();
        let responseData = JSON.parse(Buffer.from(sagemakerResult.Body).toString('utf8'));
        console.log(JSON.stringify(responseData));
        let iplus1 = i + 1;
        let locationIndex = Math.floor(iplus1/2);
        console.log(locationIndex);
        console.log(locationArray[locationIndex]);
        let dynamoparams = {
            TableName: "SageMakerResults",
            Item: {
                CustomID: i+5, //+5 only if doing last 5 endpoints
                Location: locationArray[locationIndex],
                Data: responseData,
                Type: type
            }
        };

        await documentClient.put(dynamoparams).promise();
        console.log("Added to database");
    }
}
