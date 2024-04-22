import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Weather from "./Weather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCloudSun} from '@fortawesome/free-solid-svg-icons';

import './index.css';

function App() {
  const [country, setcountry] = useState("");
  const [city, setcity] = useState([]);
  const [weather, setweather] = useState([]);
  const [late, setlate] = useState(0);
  const [long, setlong] = useState(0);

  function handleShowWeather(index) {
    const showcity = city[index];
    console.log(showcity);
    setlate(showcity.coordinates.lat);
    setlong(showcity.coordinates.lon);
  }

  useEffect(
    function () {
      async function fetchCities() {
        const res = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22${country}%22`
        );
        const data = await res.json();
        const object = await data.results;
        console.log(object);
        setcity(object);
      }
      fetchCities();
    },
    [country]
  );

  useEffect(
    function () {
      async function fetchweather() {
        const lat = late;
        const lon = long;
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b119046afa4ffd917477b2c24770c8fb`
        );
        const data = await res.json();
        console.log(data);
        setweather(data);
         
      }
      fetchweather();
    },
    [late, long]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              city={city}
              country={country}
              setcountry={setcountry}
              handleShowWeather={handleShowWeather}
            />
          }
        />
        <Route
          path="weatherPage"
          element={<Weather weather={weather} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function Main({ city, setcountry, country, handleShowWeather }) {
  return (
   <div className=" app mt-10">
    <main>
      <header>
        <h1 className="text-4xl text-center mb-5 text-[#fff] font-extrabold"> <FontAwesomeIcon icon={faCloudSun} style={{color: "#fafafa",}} /> Weather App</h1>
        <input
          type="text"
          className={`bg-[#D3D3D3] bg-opacity-25 px-9 py-3 mb-4 rounded-lg placeholder-[#ffffff] text-xl`}
          value={country}
          onChange={(e) => setcountry(e.target.value)}
          placeholder="Enter the country name"
        />
      </header>
    </main>  

    {city.length > 1 && <div className="list overflow-y-scroll mt-5">
      <table className=" w-full rounded-lg p-4 bg-[#D3D3D3] bg-opacity-25 text-sm text-left  rtl:text-right">
        <thead className="text-xl">
          <tr>
            <th className="px-6 py-3 text-center">Cities</th>
            <th className="px-6 py-3">Population</th>
            <th className="px-6 py-3">Country_code</th>
            <th className="px-6 py-3">Ascii_name</th>
            <th className="px-6 py-3">Time_Zone</th>
            <th className="px-6 py-3">Lat</th>
            <th className="px-6 py-3">Lon</th>
          </tr>
        </thead>

        <tbody>
          {country &&
            city.map((cities, index) => (
              <tr className="text-center" key={index}>
                <td
                  className="text-[#020617] hover:underline cursor-pointer py-2 px-4"
                  onClick={() => handleShowWeather(index)}
                  key={index}
                >
                  <Link to="WeatherPage">{cities.name}</Link>
                </td>
                <td >{cities.population}</td>
                <td >{cities.country_code}</td>
                <td>{cities.ascii_name}</td>
                <td >{cities.timezone}</td>
                <td >{cities.coordinates.lat}</td>
                <td >{cities.coordinates.lon}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>}
      </div>

  );
}




export default App;
