import { timeStamp } from "console";


export class WeatherResult {
    location: string;
    timestamp: number;
    tmax: number; // Mean daily max temperature (C)
    tmin: number; // Mean daily min temperature (C)

    constructor(location: string, timestamp: number, tmax: number, tmin: number){
        this.location = location
        this.timestamp = timestamp
        this.tmax = tmax
        this.tmin = tmin
    }

    getLocation(): string {
        return this.location
    }

    getTimestamp(): number {
        return this.timestamp
    }

    getTmax(): number {
        return this.tmax
    }

    getTmin(): number {
        return this.tmin
    }


    toString(): string {
        return "Location: " + this.location + " Timestamp: " + this.timestamp + " Mean Max Temp: " + this.tmax + " Mean Min Temp: " + this.tmin
    }
}

export async function processWeather(filename: string, location: string){
    let fs = require('fs');
    let result = await fs.promises.readFile(filename, 'utf8');
    let resArray:Array<string> = result.split("\n");
    let outputArray: WeatherResult[] = []
    
    for (let line of resArray){
        if ((line.indexOf(" ") == 0) && ((line.includes("yyyy") == false) || (line.includes("days") == false))) {
            let regex:any = /[ ]{2,}/;
            let lineArray = line.split(regex);
            lineArray.shift();
            let year = lineArray[0];
            let month = lineArray[1];

            let timestring: string = year + "-" + month + "-1"; // YYYY-MM-1

            let timestamp: number = new Date(timestring).valueOf();

            let tmax: number = avoidErrors(lineArray[2])
            let tmin: number = avoidErrors(lineArray[3])
            let tempWeather = new WeatherResult(location, timestamp, tmax, tmin);
            //console.log(tempWeather.toString())
            
            outputArray.push(tempWeather)
        }

        
    }
    outputArray.shift()
    outputArray.shift()
    
    return new Promise( (resolve, reject) => {
        resolve(outputArray)
    })
}

function avoidErrors(input: string): number{
    if (input == "---"){
        console.log("number is " + input)
        return -300

    } else if (input.indexOf('*') != -1) {
        // Some lines have a * at the end
        input = input.slice(0, -1);
        console.log("number is " + input)
        return parseFloat(input)

    }else {
        console.log("number is " + input)
        return parseFloat(input)
    }
}