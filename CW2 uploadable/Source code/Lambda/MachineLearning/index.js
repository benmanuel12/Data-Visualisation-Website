let AWS = require('aws-sdk');
let luxon = require("luxon");
let fs = require('fs');
let db = require('database');

exports.handler = async function (event, context, callback){
     try {
        let locationArray = ["Armagh", "Braemar", "Camborne", "Durham", "Heathrow"];
        let startDataISOArray = ["1865-04-01T00:00:00", "1959-05-01T00:00:00", "1978-09-01T00:00:00", "1880-01-01T00:00:00", "1948-01-01T00:00:00"]
        let timestamps = [-3305664000000, -336787200000, 273456000000, -2840140800000, -694310400000] // first timestamp in data that doesn't have invalid values as data

        for (let i = 0; i < locationArray.length; i++) {
            let rawDataArray = (await db.getNumericalData(1800, locationArray[i], timestamps[i])).Items;
            
            // construct necessary JSON format
            let totalLength = rawDataArray.length;
            let trainLength = (Math.floor(totalLength / 3)* 2);
            // console.log("Total: " + totalLength + "; train: " + trainLength);

            // fix dates
            let startTime = luxon.DateTime.fromISO(startDataISOArray[i]);
            
            //Create the max array
            let maxtestTimeSeries = [];
            for (let j = 0; j < rawDataArray.length; j++) {
                maxtestTimeSeries.push(rawDataArray[j].MaxMeanTemp);
            }
            
            let maxtrainTimeSeries = maxtestTimeSeries.slice(0, trainLength);
            
            let maxtrainFinal = {
                start: startTime.toFormat("y'-'MM'-'dd' 'TT"),
                target: maxtrainTimeSeries
            };
            
            let maxtestFinal = {
                start: startTime.toFormat("y'-'MM'-'dd' 'TT"),
                target: maxtestTimeSeries
            };
            
            console.log(locationArray[i] + " Max Train: " + JSON.stringify(maxtrainFinal));
            console.log(locationArray[i] + " Max Test: " + JSON.stringify(maxtestFinal));
            
            //Create the max array
            let mintestTimeSeries = [];
            for (let j = 0; j < rawDataArray.length; j++) {
                mintestTimeSeries.push(rawDataArray[j].MinMeanTemp);
            }
            
            let mintrainTimeSeries = mintestTimeSeries.slice(0, trainLength);
            
            let mintrainFinal = {
                start: startTime.toFormat("y'-'MM'-'dd' 'TT"),
                target: mintrainTimeSeries
            };
            
            let mintestFinal = {
                start: startTime.toFormat("y'-'MM'-'dd' 'TT"),
                target: mintestTimeSeries
            };
            
            console.log(locationArray[i] + " Min Train: " + JSON.stringify(mintrainFinal));
            console.log(locationArray[i] + " Min Test: " + JSON.stringify(mintestFinal));
        }
    } catch (err) {
        console.log("ERROR: " + JSON.stringify(err));
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }

    //Success
    return { statusCode: 200, body: "Data processed successfully." };
};