const express = require("express");
const bodyParser = require ("body-parser");
const https= require("https");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
const query =req.body.cityName;
const apiKey="235c5e8070d3eb15579f34d4e9e49a2c";
const unit ="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
https.get(url,function(response){
  console.log(response);
  response.on("data",function(data){
    const weatherData= JSON.parse(data)
    const temp =weatherData.main.temp
    const weatherDescription=weatherData.weather[0].description;
    const icon= weatherData.weather[0].icon;
    const imageURL ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    res.write("<h1>The Temperature in "+ query+" is " + temp + " degrees Celsius.</h1>");
    res.write("<h3>The Current Weather in "+ query+" is " + weatherDescription + " .</h3>");
    res.write("<img src = " + imageURL + ">");
    res.send();
  })
})
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running");
});
