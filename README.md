# Pixabay-Weather App Documentation

## Overview

The Pixabay-Weather App is a React-based web application that integrates two key functionalities:

1. **Pixabay Image Search**: Allows users to search for high-quality images using the Pixabay API.
2. **OpenWeather City Weather Search**: Enables users to retrieve real-time weather data for any city using the OpenWeather API.

The app features a clean, responsive design with Bootstrap styling and provides an intuitive user experience.

## Features

### Pixabay Image Search

- Users can search for images by entering a query in the search bar.
- Results are displayed in a responsive grid layout with cards.
- Each card includes:
  - Tags and dimensions in the header (e.g., louvre, pyramid, paris | 1600 x 1066).
  - A high-quality image in the card body.
  - A "More Details" button in the footer that display a modal image view and links to the original image on Pixabay.

### OpenWeather City Weather Search

- Users can input a city name to retrieve real-time weather data.
- Weather details are displayed in cards, including:
  - City name and country in the header.
  - Weather description, temperature, and an icon in the body.
  - A "More Details" button in the footer linking to OpenWeather's website.

### Responsive Design

The app is fully responsive:

- Large screens: 3 cards per row.
- Medium screens: 2 cards per row.
- Small screens: 1 card per row.

### Pagination

For Pixabay Image Search, pagination is implemented at the bottom of the grid.

- Users can navigate between pages using "Previous," "Next," or specific page numbers.

## Technologies Used

- **React**: For building the user interface.
- **Bootstrap**: For styling and responsive design.
- **Axios**: For making API requests.
- **React Router**: For navigation between Pixabay and OpenWeather apps.
- **Environment Variables (.env)**: To securely store API keys.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/pixabay-weather-app.git
cd pixabay-weather-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file in the root directory and add your API keys:

```text
REACT_APP_PIXABAY_API_KEY=your_pixabay_api_key
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
```

### 4. Start the Development Server

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Code Structure

### Config File (src/config.js)

Centralizes API URLs and keys:

```javascript
const config = {
  pixabay: {
    baseUrl: "https://pixabay.com/api/",
    apiKey: process.env.REACT_APP_PIXABAY_API_KEY,
  },
  openWeather: {
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    apiKey: process.env.REACT_APP_OPENWEATHER_API_KEY,
  },
};

export default config;
```

### PixabaySearch Component (src/components/PixabaySearch.js)

Features:

- Search bar for querying images.
- Responsive grid layout for displaying image results.

Key Code Snippet:

```jsx
<div className="input-group mb-3">
  <input
    type="text"
    className="form-control"
    placeholder="Search for images..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") fetchImages();
    }}
  />
  <button className="btn btn-primary ms-2" onClick={() => fetchImages()}>
    Search
  </button>
</div>
```

Each card includes:

```jsx
<Card className="shadow-sm">
  <Card.Header>
    <Card.Text>
      {image.tags} | {`${image.imageWidth} x ${image.imageHeight}`}
    </Card.Text>
  </Card.Header>
  <Card.Body className="p-0">
    <Card.Img
      variant="top"
      className="img-fluid"
      style={{ width: "100%", objectFit: "cover" }}
      src={image.webformatURL}
    />
  </Card.Body>

  <Card.Body>
    <Button variant="primary" onClick={() => setSelectedImage(image)}>
      More Details
    </Button>
  </Card.Body>
</Card>
```

### OpenWeatherApp Component (src/components/OpenWeatherApp.js)

Features:

- Search bar for querying city weather data.
- Responsive grid layout for displaying weather results.

Key Code Snippet:

```jsx
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
```

Displayed card include:

```jsx
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
```

## Screenshots

### Pixabay Image Search Page:

<img width="1728" alt="Screenshot 2024-12-31 at 2 06 54 AM" src="https://github.com/user-attachments/assets/64111d93-c690-442b-b2ec-951c92dedfc7" />


### OpenWeather City Weather Page:

<img width="1728" alt="Screenshot 2024-12-31 at 2 06 23 AM" src="https://github.com/user-attachments/assets/46317ffe-494c-40d4-bb45-2d5ebdfcf6c4" />

