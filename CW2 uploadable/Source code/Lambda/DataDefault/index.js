exports.handler = async(event) => {
    console.log("\nEVENT:\n" + JSON.stringify(event))

    const response = {
        statusCode: 500,
        body: JSON.stringify('Error. Message not recognized'),
    };

    return response;
};