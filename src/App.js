import React, { useEffect, useState } from "react";
import MasterCard from "./Components/MasterCard/MasterCard.js";
import MetaCard from "./Components/Card/MetaCard.js";
import './App.css';

function App() {

  const [cityValue, setCityValue] = useState("London");
  const [weatherObject, setWeatherObject] = useState({});
  const [ObjectCOD, setObjectCOD] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tempurature, setTempurature] = useState([]);
  const [weather, setWeather] = useState([]);
  const [coords, setCoords] = useState([]);

  useEffect(() => {

    setIsLoading(true);

    const origin = "http://api.openweathermap.org/data/2.5/weather?q=";
    const city = cityValue.replace(/ /g, "+");
    const key = "&appid=b8dffa3f3105e87755d28b26b4e78c14";
    const endpoint = `${origin}${city}${key}`;
    //http://api.openweathermap.org/data/2.5/weather?q=London&appid=b8dffa3f3105e87755d28b26b4e78c14
    //This is my endpoint. If you copy in in the URL bar it returns a page with JSON.

    console.log(`Requested API from ${endpoint}. Awaiting Response`);
    fetch(endpoint, 
      {
        method: "get",
        cache: "no-cache"
      })
    .then((response) => {
      console.log(response.status);
      return response.json();
    }, (networkError) => {
      console.log(networkError);
    })
    .then((jsonResponse) => {
      setIsLoading(false);
      console.log("Request Successful!")
      console.log(jsonResponse);
      setWeatherObject(jsonResponse);
    });

  }, [cityValue])

  useEffect(() => {
    setObjectCOD(weatherObject.cod);
    if (weatherObject.main !== undefined) {
      setTempurature([weatherObject.main.temp, weatherObject.main["feels_like"]]);
      setCoords([weatherObject.coord.lat, weatherObject.coord.lon]);
      setWeather([weatherObject.weather[0].main, weatherObject.weather[0].description]);
    }
  }, [weatherObject])

  return (
    
    <div className="App">
      <div className="header">
        <h2>WEATHER APP II</h2>
      </div>
      <div className="content-container">
        <div className="MasterCard">
          <MasterCard 
            mainTemp={
              isLoading ? "Loading" : tempurature[0]
            }
            feelsLikeTemp={
              isLoading ? "Loading" : tempurature[1]
            }
            icons={
              {
              "Clear": "far fa-sun",
              "Clouds": "fas fa-cloud",
              "Rain": "fas fa-cloud-rain",
              "Snow": "far fa-snowflake"
              }
            }
            main={weather[0]}
            description={weather[1]}
          />
        </div>
        <div className="MetaCard">
          <MetaCard
            cityValue={(() => {
              if (ObjectCOD !== "404") {
                return cityValue;
              }
              else {
                return "City Not Found";
              }
            })()}
            lat={
              isLoading ? "Loading" : coords[0]
            }
            lon={
              isLoading ? "Loading" : coords[1]
            }
            changeCityValue={(value) => {setCityValue(value)}}
          />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
