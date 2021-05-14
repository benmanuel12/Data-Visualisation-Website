// Import external library with websocket functions
let ws = require('websocket');
let db = require('database');

// Hard coded domain name and stage - use when pushing messages from server to client
let domainName = "3yiievlsmk.execute-api.us-east-1.amazonaws.com";
let stage = "production";

exports.handler = async(event) => {
    try{
        // Get promises message to connected clients
        await ws.updateClients(domainName, stage);
        
        //Success
        return { statusCode: 200, body: "Done" };

    } catch (err) {
        console.log("ERROR: " + JSON.stringify(err));
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }
};