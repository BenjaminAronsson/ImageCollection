"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var path = require("path");
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Headers", "Content-Type");
    response.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.static(path.join(path.resolve(), "../frontend/dist")));
var MasterRequest = require("request");
var options = {
    method: "GET",
    url: "https://www.ellos.se/api/articles?path=barn%2Fbabyklader-stl-50-92",
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
app.listen(5000, function () {
    console.log("Service is running on port 5000");
});
function CreateProductList(articleList) {
    var response = new ProductResponse();
    articleList.forEach(function (article) {
        var product = new Product();
        product.title = article.name;
        product.currentPrice = parseFloat(article.currentPriceFmt);
        product.originalPrice = parseFloat(article.originalPriceFmt);
        product.id = article.id;
        product.imageUrl = "https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$el$&n=" + article.imageFront;
        response.products.push(product);
    });
    return response;
}
var ProductResponse = /** @class */ (function () {
    function ProductResponse() {
        this.products = [];
    }
    return ProductResponse;
}());
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
