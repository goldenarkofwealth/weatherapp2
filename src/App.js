import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [cityValue, setCityValue] = useState("London");

  useEffect(() => {
    const origin = "api.openweathermap.org/data/2.5/weather?q=";
    const city = cityValue;
    const key = "&appid=b8dffa3f3105e87755d28b26b4e78c14";
    const endpoint = `${origin}${city}${key}`;
    //http://api.openweathermap.org/data/2.5/weather?q=London&appid=b8dffa3f3105e87755d28b26b4e78c14
    //This is my endpoint. If you copy in in the URL bar it returns a page with JSON.

    console.log(endpoint);
    fetch(endpoint, 
      {
        method: "get",
        cache: "no-cache"
      })
    .then((response) => {
      console.log(response.status);
      return response.json(); //THE ERROR IS HERE. IT RETURNS AN HTML DOCUMENT AS ITS RESPONSE!
    }, (networkError) => {
      console.log(networkError);
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
    });

  }, [cityValue])

  return (
    <div className="App">

    </div>
  );
}

export default App;
