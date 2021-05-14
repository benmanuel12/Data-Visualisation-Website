const dotenv = require('dotenv')

const Twitter = require('twitter')

import {putTweets} from './putTweets'

dotenv.config();

let client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

async function searchTweets(keyword: string, location: string){
    let TweetArray: Array<string>[] = []
    try {
        let searchParameters = {
            q: keyword,
            count: 20,
            lang: "en"
        };

        let result = await client.get("search/tweets", searchParameters);
        //console.log(JSON.stringify(result));

        result.statuses.forEach((tweet: any) => {
            //console.log(tweet)
            let TweetData = [tweet.id, tweet.created_at, tweet.text, location]
            TweetArray.push(TweetData)
        });
        return TweetArray;
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
}

async function doEverything() {
    let tweets1: string[][] = await searchTweets("Northern Ireland weather", "Armagh") as Array<string>[]
    let tweets2: string[][] = await searchTweets("Northern Scotland weather", "Braemar") as Array<string>[]
    let tweets3: string[][] = await searchTweets("South West England weather", "Camborne") as Array<string>[]
    let tweets4: string[][] = await searchTweets("Northern England weather", "Durham") as Array<string>[]
    let tweets5: string[][] = await searchTweets("London weather", "Heathrow") as Array<string>[]

    putTweets(tweets1)
    putTweets(tweets2)
    putTweets(tweets3)
    putTweets(tweets4)
    putTweets(tweets5)
}

doEverything();

/*
Armagh - Northern Ireland
Braemar - Northern Scotland
Camborne - South West England
Durham - Northern England
Heathrow - London
*/