import {processWeather} from './ProcessWeather'
import {putWeather} from './PutWeather'
import {WeatherResult} from './ProcessWeather'

/*
This code is used to download the files from the internet
Its not needed everytime the code is run unless the file is likely to have changed

let urls: string[] = [
    'https://www.metoffice.gov.uk/pub/data/weather/uk/climate/stationdata/armaghdata.txt',
    'https://www.metoffice.gov.uk/pub/data/weather/uk/climate/stationdata/braemardata.txt',
    'https://www.metoffice.gov.uk/pub/data/weather/uk/climate/stationdata/cambornedata.txt',
    'https://www.metoffice.gov.uk/pub/data/weather/uk/climate/stationdata/durhamdata.txt',
    'https://www.metoffice.gov.uk/pub/data/weather/uk/climate/stationdata/heathrowdata.txt'
]

let paths: string[] = [
    'sources/armaghdata.txt',
    'sources/braemardata.txt',
    'sources/cambornedata.txt',
    'sources/durhamdata.txt',
    'sources/heathrowdata.txt'
]

for (let i: number = 0; i < urls.length; i++) {
    downloadFile(urls[i], paths[i])
}
*/

async function dataFunction() {
    //let armaghresults: any = await processWeather("sources/armaghdata.txt", "Armagh")
    //let braemarresults: any = await processWeather("sources/braemardata.txt", "Braemar")
    // let camborneresults: any = await processWeather("sources/cambornedata.txt", "Camborne")
    // let durhamresults: any = await processWeather("sources/durhamdata.txt", "Durham")
     let heathrowresults: any = await processWeather("sources/heathrowdata.txt", "Heathrow")
    // console.log("tmax: " + typeof(armaghresults[0].getTmax()));
    // console.log("tmin: " + typeof(armaghresults[0].getTmin()));
    // console.log(armaghresults[0])

    //putWeather(armaghresults)
    //putWeather(braemarresults)
    // putWeather(camborneresults)
    // putWeather(durhamresults)
     putWeather(heathrowresults)
}

dataFunction();