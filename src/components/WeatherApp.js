import React, { useState } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import config from "../config";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `${config.openWeather.baseUrl}?q=${city}&appid=${config.openWeather.apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>City Weather Search</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeatherData(); // Trigger search on Enter key
          }}
        />
        <button className="btn btn-primary ms-2" onClick={() => fetchWeatherData()}>
          Search
        </button>
      </div>

      {weatherData && (
        <Card className="h-100 shadow-sm">
          <Card.Header className="text-center bg-light">
            <strong>{weatherData.name}</strong> | {weatherData.sys.country}
          </Card.Header>
          <Card.Body className="text-center">
            <h5>{weatherData.weather[0].description}</h5>
            <h3>{Math.round(weatherData.main.temp)}°C</h3>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              style={{ width: "50px", height: "50px" }}
            />
          </Card.Body>
          <Card.Footer className="text-center bg-light">
            <Button
              variant="primary"
              onClick={() =>
                window.open(
                  `https://openweathermap.org/city/${weatherData.id}`,
                  "_blank"
                )
              }
            >
              More Details
            </Button>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default WeatherApp;
