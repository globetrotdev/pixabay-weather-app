const config = {
  pixabay: {
    baseUrl: 'https://pixabay.com/api/',
    apiKey: process.env.REACT_APP_PIXABAY_API_KEY,
  },
  openWeather: {
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    apiKey: process.env.REACT_APP_OPENWEATHER_API_KEY,
  },
};

export default config;
