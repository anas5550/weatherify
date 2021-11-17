import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Covid19Page from './covid19Page';

function App() {
  const [temperature, setTemperature] = useState();
  const [description, setDescription] = useState("");
  const [cityName, setCityName] = useState("");
  const [inputData, setInputData] = useState("");
  const [emoji, setEmoji] = useState("");

const notify = () => toast.error("Opps 😥, City Not Found!");


  function getData(){
    axios.get(`https://api.openweathermap.org/data/2.5/find?q=${inputData}&units=metric&appid=6faebeb9d32de74e053ab7b148a867dd`).
    then((res)=>{
      
      var temperature =  res.data.list[0].main.temp;
      var description = res.data.list[0].weather[0].main;
      var cityName = res.data.list[0].name;
      var icon = res.data.list[0].weather[0].icon;
      
      if(icon=="01d" || icon=="02d"  || icon=="03d" ||icon=="04d" || icon=="01n" || icon=="02n"  || icon=="03n" ||icon=="04n"  ){
        setEmoji("🌥"); /// clouds
      }
      else if(icon=="09d"  ||  icon=="09n"){
        setEmoji("🌧")  /// rain
      }
      else if(icon=="11d" || icon=="11n"){
        setEmoji("⛈")  /// thunderstorm
      }
      else if(icon=="13d" || icon=="13n"){
        setEmoji("❄️")  /// snow
      }
      else if(icon=="50d" || icon=="50n"){
        setEmoji("🌫️")  /// mist
      }


      setTemperature(temperature + " ℃"); 
      setCityName(cityName);
      setDescription(description);
    
    }).catch((error)=>{
      if(inputData==""){
        toast.error("Enter city name");
        return;
      }
      notify();
    })
  }

  return (
  <>
    <div className="container">
      <div className="row">

        <div className="col-lg-8">
            <Covid19Page/>
        </div>
        
        <div className="col-lg-4">
          
          <h1 className="text-center weather-heading">Weather Data</h1>

          <div className="card shadow weather-bg">
            <div className="col">
              <h1 className="heading">Weatherify</h1>
                <input type="text" className="form-control" placeholder="City name" value={inputData} onChange={(e)=>{setInputData(e.target.value)}} required/>
                <div className="d-grid gap-2">
                  <button onClick={getData} className="btn btn-dark">Get Weather Info</button>
                </div>
                <h1 className="temperature">{temperature}</h1>
                <h1 className="cityname">{cityName}</h1>
                <h1 className="condition"> {description} <span className="emoji">{emoji}</span></h1>
            </div>
          </div> 
        </div>
      </div>
      <ToastContainer />
      <p className="credit">Made with ❤️ by Anas Siddiqui</p>
    </div>
    </>
  );
  
}

export default App;
