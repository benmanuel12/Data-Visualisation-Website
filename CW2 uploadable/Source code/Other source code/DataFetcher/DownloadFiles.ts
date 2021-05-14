const https = require('https');
const fs = require('fs');

export function downloadFile(url: string, path: string): void{
    const request = https.get(url, function(response: any) {
        if (response.statusCode === 200) {
            let file = fs.createWriteStream(path);
            response.pipe(file);
        }
        request.setTimeout(60000, function() { // if after 60s file not downloaded, we abort a request 
            request.abort();
        });
    });
}