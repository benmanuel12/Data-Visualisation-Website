let AWS = require("aws-sdk");

exports.handler = async (event) => {
    let comprehend = new AWS.Comprehend();
    let documentClient = new AWS.DynamoDB.DocumentClient();
    
    try{
    
        for(let record of event.Records){
            if(record.eventName === "INSERT"){
                let tweetID = record.dynamodb.NewImage.TweetID.N;
                let location = record.dynamodb.NewImage.Location.S;
                let text = record.dynamodb.NewImage.TweetText.S;
                let timeStamp = record.dynamodb.NewImage.TweetTime.N;
                
                
                let comprehendParams = {
                    LanguageCode: "en",
                    Text: text
                };
                  
                // Get sentiment 
                let sentimentAnswer = await comprehend.detectSentiment(comprehendParams).promise();
                console.log("Sentiment processed: " + JSON.stringify(sentimentAnswer));
                
                //SAVE SENTIMENT RESULTS IN DATABASE
                
                // AWS.config.update({
                //     region: "us-east-1",
                //     endpoint: "https://dynamodb.us-east-1.amazonaws.com"
                // });
                
            
                let params = {
                    TableName: "SentimentResults",
                    Item: {
                        TweetID: parseInt(tweetID),
                        Location: location,
                        SentimentResult: sentimentAnswer,
                        TweetTime: parseInt(timeStamp)
                    }
                };
                
                await documentClient.put(params).promise();
                console.log("Added to database");
            }
        }
    }
    catch(err){
        console.error(err);
    }
    
    const response = {
        statusCode: 200,
        body: "Tweets Processed!",
    };
    return response;
};