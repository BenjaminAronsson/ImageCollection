import { Product } from "./models/Product";
import { ProductResponse } from "./models/ProductResponse";

//#region - Setup
const express = require("express");
const app = express();
const path = require("path");
const MasterRequest = require("request");
const bodyParser = require("body-parser");
const fs = require("fs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Headers", "Content-Type");
  response.set("Access-Control-Allow-Methods", "GET,POST");
  response.header("Access-Control-Allow-Origin", "*");
  next();
});
app.listen(5000, () => {
  LoadMessage();
  console.log("Service is running on port 5000");
});

//#endregion

//#region - Frontend application

app.use(express.static(path.join(path.resolve(), "../frontend/dist")));

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

//#endregion

//#region - Message api

var apiMessage = "Secret message";

app.post("/api/message/", (request, apiResponse) => {
  try {
    let newMessage = request.body.message;
    if (!newMessage) {
      apiResponse.status(400);
      apiResponse.send({
        message: "Please send a similar request, example: {message: 'test'}",
      });
    } else {
      apiMessage = newMessage;
      SaveMessage();
      apiResponse.status(200);
      apiResponse.send({ message: "Message has been updated" });
    }
  } catch (err) {
    console.log(err);
    apiResponse.status(500);
    apiResponse.send(err);
  }
});

app.get("/api/message/", (request, apiResponse) => {
  let length = request.query.length;
  let myMessage = apiMessage;
  if ((length as number) > 0) {
    myMessage = apiMessage.substring(0, length);
    if (myMessage.length < length) {
      myMessage = myMessage.padEnd(length, " ");
    }
  }

  let response = {
    result: myMessage,
  };

  apiResponse.status(200);
  apiResponse.send(response);
});

//#endregion

//#region - Mockdb

function SaveMessage() {
  fs.writeFile(__dirname + "/database/message.txt", apiMessage, () => {});
}

function LoadMessage() {
  fs.readFile(
    __dirname + "/database/message.txt",
    function (err: any, data: any) {
      if (err) {
        console.log(err);
      }
      apiMessage = data.toString();
      console.log("loaded message", apiMessage);
    }
  );
}

//#endregion
