import { useState } from "react"
import "./Weather.css"
import search_icon from "../assets/search.png"

import humidity from "../assets/humidity.png"

import wind from "../assets/wind.png"

const Weather = () => {
  const [weatherData, setWhetherData] = useState(false)
  const [input, setInput] = useState("London")
  const search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`

      const response = await fetch(url)

      const data = await response.json()
      if (!response.ok) {
        alert(data.message)
      }
      console.log(data)
      setWhetherData({
        description: data.weather[0].description,
        location: data.name,
        temparature: Math.floor(data.main.temp),
        wind: data.wind.speed,
        humidity: data.main.humidity,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      })
    } catch (error) {
      alert("Something Went Wrong...", error)
    }
  }

  return (
    <div className="weather">
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
        />
        <img src={search_icon} alt="" onClick={() => search()} />
      </div>
      {weatherData ? (
        <div className="main-section">
          <div className="left-side">
            <p className="">{weatherData.temparature} °C</p>
            <div className="wind">
              <img src={wind} alt="" />
              <p>{weatherData.wind} km/h</p>
            </div>
            <div className="temp">
              <img src={humidity} alt="" />
              <p>{weatherData.humidity}%</p>
            </div>
          </div>
          <div className="right-side">
            <div className="weather-image-text">
              <p className="weather-text">{weatherData.description}</p>
              <img src={weatherData.icon} alt="" />
            </div>
            <p className="weather-location">{weatherData.location}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Weather
