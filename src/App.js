import React, { useEffect, useState } from "react";
import Tempurature from "./Components/Tempurature/Tempurature.js";
import './App.css';

function App() {

  const [cityValue, setCityValue] = useState("London");
  const [weatherObject, setWeatherObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mainTemp, setMainTemp] = useState(0);
  const [feelsLikeTemp, setFeelsLikeTemp] = useState(0);

  useEffect(() => {

    setIsLoading(true);

    const origin = "http://api.openweathermap.org/data/2.5/weather?q=";
    const city = cityValue;
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
    if (weatherObject.main !== undefined) {
      setMainTemp(weatherObject.main["temp"]);
      setFeelsLikeTemp(weatherObject.main["feels_like"]);
    }
  }, [weatherObject])

  return (
    <div className="App">
      <div className="header">
        <h2>WEATHER APP II</h2>
      </div>
      <div className="content-container">
        <div className="Tempurature">
          <Tempurature 
            mainTemp={
              isLoading ? "Loading" : mainTemp
            }
            feelsLikeTemp={
              isLoading ? "Loading" : feelsLikeTemp
            }
          />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
