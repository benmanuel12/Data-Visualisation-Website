const axios = require('axios');
let studentID = 'M00666131';
let url = 'https://39kicq1lg9.execute-api.us-east-1.amazonaws.com/prod/'

const plotly_username = 'bm782';
const plotly_key = 'exlLYbcR6MdCfdqHn7xR';

let plotly = require('plotly')(plotly_username, plotly_key);

exports.handler = async(event) => {
    try {
        let yValues = (await axios.get(url + studentID)).data.target;

        let xValues = [];
        for (let i = 0; i < yValues.length; i++) {
            xValues.push(i)
        }

        let plotResult = await plotData(xValues, yValues);
        console.log("Plot availible at " + plotResult.url)

        return {
            statusCode: 200,
            body: "Ok"
        }
    } catch (err) {
        console.log("Error: " + JSON.stringify(err));
        return {
            statusCode: 500,
            body: "Error"
        }
    }
}

async function plotData(xValues, yValues) {
    let data = [{
        x: xValues,
        y: yValues,
        type: "scatter",
        mode: "line",
        marker: {
            color: "rgb(219, 64, 82)",
            size: 12
        }
    }]

    let layout = {
        title: "Synthetic Data",
        font: {
            size: 25
        },
        xaxis: {
            title: "Time (hours)"
        },
        yaxis: {
            title: "Value"
        }
    };

    let graphOptions = {
        layout: layout,
        filename: "dateaxes",
        fileopt: "overwrite"
    };

    return new Promise((resolve, reject) => {
        plotly.plot(data, graphOptions, function(err, msg) {
            if (err)
                reject(err);
            else {
                resolve(msg);
            }
        })
    })
};

exports.handler({});