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
var dotenv = require('dotenv');
var Twitter = require('twitter');
var putTweets_1 = require("./putTweets");
dotenv.config();
var client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
function searchTweets(keyword, location) {
    return __awaiter(this, void 0, void 0, function () {
        var TweetArray, searchParameters, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TweetArray = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    searchParameters = {
                        q: keyword,
                        count: 20,
                        lang: "en"
                    };
                    return [4 /*yield*/, client.get("search/tweets", searchParameters)];
                case 2:
                    result = _a.sent();
                    //console.log(JSON.stringify(result));
                    result.statuses.forEach(function (tweet) {
                        //console.log(tweet)
                        var TweetData = [tweet.id, tweet.created_at, tweet.text, location];
                        TweetArray.push(TweetData);
                    });
                    return [2 /*return*/, TweetArray];
                case 3:
                    error_1 = _a.sent();
                    console.log(JSON.stringify(error_1));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function doEverything() {
    return __awaiter(this, void 0, void 0, function () {
        var tweets1, tweets2, tweets3, tweets4, tweets5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, searchTweets("Northern Ireland weather", "Armagh")];
                case 1:
                    tweets1 = _a.sent();
                    return [4 /*yield*/, searchTweets("Northern Scotland weather", "Braemar")];
                case 2:
                    tweets2 = _a.sent();
                    return [4 /*yield*/, searchTweets("South West England weather", "Camborne")];
                case 3:
                    tweets3 = _a.sent();
                    return [4 /*yield*/, searchTweets("Northern England weather", "Durham")];
                case 4:
                    tweets4 = _a.sent();
                    return [4 /*yield*/, searchTweets("London weather", "Heathrow")];
                case 5:
                    tweets5 = _a.sent();
                    putTweets_1.putTweets(tweets1);
                    putTweets_1.putTweets(tweets2);
                    putTweets_1.putTweets(tweets3);
                    putTweets_1.putTweets(tweets4);
                    putTweets_1.putTweets(tweets5);
                    return [2 /*return*/];
            }
        });
    });
}
doEverything();
/*
Armagh - Northern Ireland
Braemar - Northern Scotland
Camborne - South West England
Durham - Northern England
Heathrow - London
*/ 
