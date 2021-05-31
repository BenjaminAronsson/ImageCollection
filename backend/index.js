"use strict";
exports.__esModule = true;
var Product_1 = require("./models/Product");
var ProductResponse_1 = require("./models/ProductResponse");
//#region - Setup
var express = require("express");
var app = express();
var path = require("path");
var MasterRequest = require("request");
var bodyParser = require("body-parser");
var fs = require("fs");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Allow-Methods", "GET,POST");
    response.header("Access-Control-Allow-Origin", "*");
    next();
});
app.listen(5000, function () {
    LoadMessage();
    console.log("Service is running on port 5000");
});
//#endregion
//#region - Frontend application
app.use(express.static(path.join(path.resolve(), "../frontend/dist")));
//const productUrl = "https://www.ellos.se/api/articles?path=herr%2Fbadklader";
var babyProductUrl = "https://www.ellos.se/api/articles?path=barn%2Fbabyklader-stl-50-92";
var options = {
    method: "GET",
    url: babyProductUrl,
    headers: {}
};
app.get("/api/products/", function (request, apiResponse) {
    try {
        MasterRequest(options, function (error, response) {
            if (error) {
                console.error(error);
                apiResponse.status(500);
                apiResponse.send(error);
            }
            else {
                var data = JSON.parse(response.body).data;
                apiResponse.status(200);
                var ResponseModel = CreateProductList(data.getProductListPage.articles);
                apiResponse.send(ResponseModel);
            }
        });
    }
    catch (err) {
        apiResponse.status(500);
        apiResponse.send(err);
    }
});
function CreateProductList(articleList) {
    var response = new ProductResponse_1.ProductResponse();
    articleList.forEach(function (article) {
        var product = new Product_1.Product();
        product.title = article.name;
        product.currentPrice = parseFloat(article.currentPriceFmt);
        product.originalPrice = parseFloat(article.originalPriceFmt);
        product.id = article.id;
        product.imageUrl = "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$el$&n=" + article.imageFront;
        response.products.push(product);
    });
    return response;
}
//#endregion
//#region - Message api
var apiMessage = "Secret message";
app.post("/api/message/", function (request, apiResponse) {
    try {
        var newMessage = request.body.message;
        if (!newMessage) {
            apiResponse.status(400);
            apiResponse.send({
                message: "Please send a similar request, example: {message: 'test'}"
            });
        }
        else {
            apiMessage = newMessage;
            SaveMessage();
            apiResponse.status(200);
            apiResponse.send({ message: "Message has been updated" });
        }
    }
    catch (err) {
        console.log(err);
        apiResponse.status(500);
        apiResponse.send(err);
    }
});
app.get("/api/message/", function (request, apiResponse) {
    var length = request.query.length;
    var myMessage = apiMessage;
    if (length > 0) {
        myMessage = apiMessage.substring(0, length);
        if (myMessage.length < length) {
            myMessage = myMessage.padEnd(length, " ");
        }
    }
    var response = {
        result: myMessage
    };
    apiResponse.status(200);
    apiResponse.send(response);
});
//#endregion
//#region - Mockdb
function SaveMessage() {
    fs.writeFile(__dirname + "/database/message.txt", apiMessage, function () { });
}
function LoadMessage() {
    fs.readFile(__dirname + "/database/message.txt", function (err, data) {
        if (err) {
            console.log(err);
        }
        apiMessage = data.toString();
        console.log("loaded message", apiMessage);
    });
}
//#endregion
