const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (request, respond) {

    respond.sendFile(__dirname + "/index.html");



});


app.use(express.static("public"));



app.post("/", function (request, respond) {

    // console.log(request.body.cityName);
    const query = request.body.cityName;
    const apiKey = "731ea414738c91e4c37f2cd56597cc82";
    const units = "metric";





    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function (res) {
        // console.log(res);

        res.on("data", function (data) {

            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;

            console.log(icon);

            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(temp);

            const description = weatherData.weather[0].description;
            console.log(description);


            // respond.write("<p>Weather Description:" + description + "</p>");
            // respond.write(" <h1>Temperature in " + query +" is :" + temp + "degree celcius</h1>");
            // respond.write("<img src=" + imageURL + ">");
            // respond.send();
            respond.render("weatherReport", { city: query, temperature: temp, image: imageURL , weather: description });
            respond.sendFile(__dirname + "/views/weatherReport.ejs");






        });


    });


});



app.post("/changeCity", function(request, respond){

    respond.redirect("/");

}  );





app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000");

});