
const express = require('express')
const app = express()
const path = require('path')

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    response.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use(express.json()); 
app.use(express.static(path.join(path.resolve(), 'public')))

const MasterRequest = require('request');



const options = {
  'method': 'GET',
  'url': 'https://www.ellos.se/api/articles?path=barn%2Fbabyklader-stl-50-92',
  'headers': {
  }
};
app.get('/api/products/', (request, apiResponse) => {
    
    MasterRequest(options, function (error, response) {
        if (error) {
            console.error(error)
            apiResponse.status(500)
            apiResponse.send(error);
        } else {
            console.log(`statusCode: ${response.statusCode}`)
            apiResponse.status(200)
            apiResponse.send(response.body)
        }
      });
})

app.listen(5000, () => {
    console.log('Service is running on port 5000')
})