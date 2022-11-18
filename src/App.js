import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiKey = "6faebeb9d32de74e053ab7b148a867dd";
// "137321260a5b81163fe9ce58e8ad859a";
// "6faebeb9d32de74e053ab7b148a867dd";
// https://api.openweathermap.org/data/2.5/forecast?lat=26.8381&lon=81.9619743&appid=6faebeb9d32de74e053ab7b148a867dd&units=metric

function App() {
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [cityName, setCityName] = useState("");
  const [inputData, setInputData] = useState("Lucknow");
  const [emoji, setEmoji] = useState("");
  const [Loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [forecastData, setForecastData] = useState([]);


  const notify = () => toast.error("Opps 😥, City Not Found!");

  const emojiList = [{
    "01d": "☁️",

  }]



  const forecast = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lat}&appid=${apiKey}&units=metric`)
      .then((res) => {
        // setForecast(res.data);
        // console.log('forecast data: ', res.data.list);
        setForecastData(res.data.list);
      }).catch((err) => {
        console.log('error in forecast');
      })
  }

  const getLatLon = () => {
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${inputData},3116&limit=4&appid=${apiKey}`)
      .then((res) => {
        // setForecast(res.data);

        setLatitude(res.data[0].lat);
        setLongitude(res.data[0].lon);
        // console.log(res.data[0].lat, res.data[0].lon);
        forecast(res.data[0].lat, res.data[0].lon);

      }).catch((err) => {
        console.log('error in forecast');
      })
  }

  async function getData() {

    setLoading(true);
    await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${inputData}&units=metric&appid=${apiKey}`)
      .then((res) => {

        var temperature = res.data.list[0].main.temp;
        var description = res.data.list[0].weather[0].main;
        var cityName = res.data.list[0].name;
        var icon = res.data.list[0].weather[0].icon;

        if (icon === "01d" || icon === "02d" || icon === "03d" || icon === "04d" || icon === "01n" || icon === "02n" || icon === "03n" || icon === "04n") {
          setEmoji("🌥"); /// clouds
        }
        else if (icon === "09d" || icon === "09n") {
          setEmoji("🌧")  /// rain
        }
        else if (icon === "11d" || icon === "11n") {
          setEmoji("⛈")  /// thunderstorm
        }
        else if (icon === "13d" || icon === "13n") {
          setEmoji("❄️")  /// snow
        }
        else if (icon === "50d" || icon === "50n") {
          setEmoji("🌫️")  /// mist
        }


        setTemperature(temperature + " ℃");
        setCityName(cityName);
        setDescription(description);

      }).catch((error) => {
        if (inputData === "") {
          toast.error("Enter city name");
          return;
        }

        //clearing the data
        setInputData("");
        setDescription("");
        setTemperature("")
        setCityName("");
        setForecastData([])
        setEmoji("")
        notify();
      })

    getLatLon();
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [])


  const forecastCard = forecastData.map((data, index) => {
    return index < 4 && <div className="col-md-3 card shadow text-center">
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "40px" }}>{data.main.temp}℃</p>
          {/* <p>feels like {data.main.feels_like}</p> */}
        </div>
        <div>
          <p>min: {data.main.temp_min}℃</p>
          <p>max: {data.main.temp_max}℃</p>
        </div>

      </div>
    </div>
  })







  return (
    <>
      <div className="container">
        <div className="row" id='row'>
          <div className="col-md-5">
            <div className="card shadow">
              <h1 className="text-center" id='heading'>Weatherify</h1>
              <input type="text" placeholder="City name" value={inputData} onChange={(e) => { setInputData(e.target.value) }} required />
              <div id='btn'>
                {
                  Loading === true ?
                    <button onClick={getData} className="btn btn-dark px-4 py-2" disabled> Loading...</button>
                    :
                    <button onClick={getData} className="btn btn-dark px-4 py-2"> Get Weather Info</button>
                }
              </div>
              {
                Loading === true ?
                  <h5 className='text-center m-5'>Loading data...</h5>
                  :
                  <div>
                    <h1 className="temperature">{temperature}</h1>
                    <h1 className="cityname">{cityName}</h1>
                    <h1 className="condition"> {description} <span className="emoji">{emoji}</span></h1>
                  </div>
              }
            </div>
          </div>
          {/* <p className="text-end">Made with ❤️ by Anas Siddiqui</p> */}
        </div>
        <ToastContainer />
      </div>

      <div className="container-fluid ">
        <div className="row">
          {forecastCard}
        </div>
      </div>
    </>
  );

}

export default App;
