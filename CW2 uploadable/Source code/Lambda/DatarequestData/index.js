// Import external library with websocket functions
let ws = require('websocket');

// Hard coded domain name and stage - use when pushing messages from server to client
// let domainName = "vfvnoa39we.execute-api.us-east-1.amazonaws.com";
// let stage = "dev";

exports.handler = async(event) => {
    try {
        //Get Message from event
        let connID = event.requestContext.connectionId;
        
        const type = JSON.parse(event.body).type;

        //Allocate domain name and stage dynamically
        let domainName = event.requestContext.domainName;
        let stage = event.requestContext.stage;
        
        console.log("About to send")
        // Get promises message to connected clients
        await ws.sendMessage(type, connID, domainName, stage);
    }
    catch (err) {
        console.log("ERROR: " + JSON.stringify(err));
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }

    //Success
    return { statusCode: 200, body: "Data sent successfully." };
};