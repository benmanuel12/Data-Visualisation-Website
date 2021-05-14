let AWS = require("aws-sdk");

//Import functions for database
let db = require('database');

module.exports.updateClients = async(domainName, stage) => {

    //Get connection IDs of clients
    let results = await db.getConnectionIDs();
    let clientIdArray = results.Items;

    console.log("\nClient IDs:\n" + JSON.stringify(clientIdArray));

    //Create API Gateway management class.
    let apigwManagementApi = new AWS.ApiGatewayManagementApi({
        endpoint: domainName + "/" + stage
    });
    
    //Grab all data
    let data = await db.getData();

    //Try to send message to connected clients
    for(let item of clientIdArray) {
        try {
            console.log("Sending message to: " + item.ConnectionID);

            //Create parameters for API Gateway
            let apiMsg = {
                ConnectionId: item.ConnectionID,
                Data: JSON.stringify([data, "update"])
            };

            //Wait for API Gateway to execute and log result
            await apigwManagementApi.postToConnection(apiMsg).promise();
            console.log("Message sent to: " + item.ConnectionID);
        }
        catch (err) {
            console.log("Failed to send message to: " + item.ConnectionID);

            //Delete connection ID from database
            if (err.statusCode == 410) {
                try {
                    await db.deleteConnectionId(item.ConnectionID);
                } catch (err) {
                    console.log("ERROR deleting connectionId: " + JSON.stringify(err));
                    throw err;
                }
            } else {
                console.log("UNKNOWN ERROR: " + JSON.stringify(err));
                throw err;
            }
        }
    }
};