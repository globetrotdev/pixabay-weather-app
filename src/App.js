import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import PixabaySearch from './components/PixabaySearch';
import WeatherApp from './components/WeatherApp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<PixabaySearch />} />
        <Route path="/weather" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
}

export default App;

