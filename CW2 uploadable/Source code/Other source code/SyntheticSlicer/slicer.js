const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let JSONdata = JSON.parse(rawdata);
console.log(JSONdata.target.length)

for (let i = 0; i < 400; i++) {
    fs.appendFile('training.json', JSONdata.target[i] + ", ", function(err) {
        if (err) throw err;
        console.log('Replaced!');
    })
}

for (let i = 400; i < 500; i++) {
    fs.appendFile('test.json', JSONdata.target[i] + ", ", function(err) {
        if (err) throw err;
        console.log('Replaced!');
    })
}