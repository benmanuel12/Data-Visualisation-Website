"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processWeather = exports.WeatherResult = void 0;
var WeatherResult = /** @class */ (function () {
    function WeatherResult(location, timestamp, tmax, tmin) {
        this.location = location;
        this.timestamp = timestamp;
        this.tmax = tmax;
        this.tmin = tmin;
    }
    WeatherResult.prototype.getLocation = function () {
        return this.location;
    };
    WeatherResult.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    WeatherResult.prototype.getTmax = function () {
        return this.tmax;
    };
    WeatherResult.prototype.getTmin = function () {
        return this.tmin;
    };
    WeatherResult.prototype.toString = function () {
        return "Location: " + this.location + " Timestamp: " + this.timestamp + " Mean Max Temp: " + this.tmax + " Mean Min Temp: " + this.tmin;
    };
    return WeatherResult;
}());
exports.WeatherResult = WeatherResult;
function processWeather(filename, location) {
    return __awaiter(this, void 0, void 0, function () {
        var fs, result, resArray, outputArray, _i, resArray_1, line, regex, lineArray, year, month, timestring, timestamp, tmax, tmin, tempWeather;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs = require('fs');
                    return [4 /*yield*/, fs.promises.readFile(filename, 'utf8')];
                case 1:
                    result = _a.sent();
                    resArray = result.split("\n");
                    outputArray = [];
                    for (_i = 0, resArray_1 = resArray; _i < resArray_1.length; _i++) {
                        line = resArray_1[_i];
                        if ((line.indexOf(" ") == 0) && ((line.includes("yyyy") == false) || (line.includes("days") == false))) {
                            regex = /[ ]{2,}/;
                            lineArray = line.split(regex);
                            lineArray.shift();
                            year = lineArray[0];
                            month = lineArray[1];
                            timestring = year + "-" + month + "-1";
                            timestamp = new Date(timestring).valueOf();
                            tmax = avoidErrors(lineArray[2]);
                            tmin = avoidErrors(lineArray[3]);
                            tempWeather = new WeatherResult(location, timestamp, tmax, tmin);
                            //console.log(tempWeather.toString())
                            outputArray.push(tempWeather);
                        }
                    }
                    outputArray.shift();
                    outputArray.shift();
                    // console.log("tmax: " + typeof(outputArray[0].getTmax()));
                    // console.log("tmin: " + typeof(outputArray[0].getTmin()));
                    // console.log(outputArray[0])
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(outputArray);
                        })];
            }
        });
    });
}
exports.processWeather = processWeather;
function avoidErrors(input) {
    if (input == "---") {
        console.log("number is " + input);
        return -300;
    }
    else if (input.indexOf('*') != -1) {
        // Some lines have a * at the end
        input = input.slice(0, -1);
        console.log("number is " + input);
        return parseFloat(input);
    }
    else {
        console.log("number is " + input);
        return parseFloat(input);
    }
}
