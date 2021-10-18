import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [temperature, setTemperature] = useState(0);
  const [description, setDescription] = useState("");
  const [cityName, setCityName] = useState("");
  const [inputData, setInputData] = useState("");
  const [emoji, setEmoji] = useState("");


// useEffect(()=>{
//   getData();
// },[inputData]);
const notify = () => toast.error("Opps Error, City Not Found!");


  function getData(){
    axios.get(`https://api.openweathermap.org/data/2.5/find?q=${inputData}&units=metric&appid=6faebeb9d32de74e053ab7b148a867dd`).
    then((res)=>{
      
      var temperature =  res.data.list[0].main.temp;
      var description = res.data.list[0].weather[0].main;
      var cityName = res.data.list[0].name;
      var icon = res.data.list[0].weather[0].icon;
      console.log(icon);
      
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


      setTemperature(temperature); 
      setCityName(cityName);
      setDescription(description);
    
    }).catch((error)=>{
      // console.log(error);
      notify();
    })
  }




  return (
    <div className="App">
      <div className="card">
      <div className="col">
        <h1 className="heading">Weatherify</h1>
        <input type="text" placeholder="Enter city name"  value={inputData} onChange={(e)=>{setInputData(e.target.value)}} required/>
        <div className="d-grid gap-2">
           <button onClick={getData} className="btn  btn-success">Get Weather Info</button>
        </div>
        <h1 className="temperature">{temperature} ℃</h1>
        <h1 className="cityname">{cityName}</h1>
        <h1 className="condition"> {description} <span className="emoji">{emoji}</span></h1>
        <ToastContainer />
      </div>
    </div>
    </div>
  );
}

export default App;
