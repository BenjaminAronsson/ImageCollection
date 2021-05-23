import { response } from "express";

const express = require("express");
const app = express();
const path = require("path");

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.join(path.resolve(), "../frontend/dist")));

const MasterRequest = require("request");

const options = {
  method: "GET",
  url: "https://www.ellos.se/api/articles?path=barn%2Fbabyklader-stl-50-92",
  headers: {},
};

app.get("/api/products/", (request, apiResponse) => {
  try {
    MasterRequest(options, function (error, response) {
      if (error) {
        console.error(error);
        apiResponse.status(500);
        apiResponse.send(error);
      } else {
        let data = JSON.parse(response.body).data;
        apiResponse.status(200);
        let ResponseModel = CreateProductList(data.getProductListPage.articles);
        apiResponse.send(ResponseModel);
      }
    });
  } catch (err) {
    apiResponse.status(500);
    apiResponse.send(err);
  }
});

app.listen(5000, () => {
  console.log("Service is running on port 5000");
});

function CreateProductList(articleList) {
  let response = new ProductResponse();

  articleList.forEach((article) => {
    let product = new Product();
    product.title = article.name;
    product.currentPrice = parseFloat(article.currentPriceFmt);
    product.originalPrice = parseFloat(article.originalPriceFmt);
    product.id = article.id;
    product.imageUrl = `https://assets.ellosgroup.com/i/ellos/b?$eg$&$em$&$ep$&$el$&n=${article.imageFront}`;
    response.products.push(product);
  });

  return response;
}

class ProductResponse {
  products: Product[] = [];
}

class Product {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
  originalPrice: number;
  currentPrice: number;
}
