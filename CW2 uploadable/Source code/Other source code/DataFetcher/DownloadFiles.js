"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = void 0;
var https = require('https');
var fs = require('fs');
function downloadFile(url, path) {
    var request = https.get(url, function (response) {
        if (response.statusCode === 200) {
            var file = fs.createWriteStream(path);
            response.pipe(file);
        }
        request.setTimeout(60000, function () {
            request.abort();
        });
    });
}
exports.downloadFile = downloadFile;
