import { String } from "aws-sdk/clients/apigateway";

let moment = require('moment')

export async function putTweets(dataArray: Array<string>[]){
    let AWS = require("aws-sdk");
    
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    for (let i = 0; i < dataArray.length; i++) {
        let documentClient = new AWS.DynamoDB.DocumentClient();

        // Process date to timestamp
        let dateString = dataArray[i][1];
        // need YYYY-MM-DDTHH:MM:SS.sssZ
        let dateStringArray = dateString.split(" ");

        dateString = dateStringArray[5] + "-" + moment().month(dateStringArray[1]).format("MM") + "-" + dateStringArray[2] + "T" + dateStringArray[3] + ".000Z"
        let myDate = Date.parse(dateString)
        let myDateStringTemp = myDate.toString();
        myDateStringTemp = myDateStringTemp.slice(0, -3)
        myDate = parseInt(myDateStringTemp)
        
        let params = {
            TableName: "TweetData",
            Item: {
                TweetID: dataArray[i][0],
                TweetTime: myDate,
                TweetText: dataArray[i][2],
                Location: dataArray[i][3]
            }
        };

        // let result: any = await documentClient.put(params).promise()
        // console.log(result)

        documentClient.put(params, (err: any, data: any) => {
            if (err) {
                console.error("Unable to add item")
                console.error("Error JSON:", JSON.stringify(err))
            }
            else {
                console.log("Weather added to table:", params.Item)
            }
        })
    }
    
}