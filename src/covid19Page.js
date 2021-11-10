import React from "react";
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
function Covid19Page(){

useEffect(()=>{
    getCovidData();
},[])
const dataLoaded = () => toast.success("Covid Data loaded successfully");
    const [state, setStates] = useState([]);

    function getCovidData(){
        axios.get('https://data.covid19india.org/data.json')
        .then((response)=>{
            var data = response.data.statewise;
            setStates(data);
            dataLoaded();

        }).catch((e)=>{
            console.log(e);
        })
    }

    return (
    <> 
    <div className="App covid-box" >
   
        <div className="table-responsive">
        <div className="main-heading ">
        <h1 className="mb-2 text-center dashboard"><span className="font-weight-bold"> India </span> Covid 19 Dashboard</h1>
    </div> 
            <table className="table table-hover">
            <thead className="thead-dark sticky">
                <tr>
                <th>S. No</th>
                    <th>State</th>
                    <th>Confirmed</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                    <th>Active</th>
                    <th>Updated</th>
                </tr>
            </thead>
            <tbody>

            {
                state.map((currEle, idx)=>{
                    return (
                <tr key={idx}>
                <td>{idx+1}</td>
                    <td >{currEle.state}</td>
                    <td>{currEle.confirmed}</td>
                    <td>{currEle.recovered}</td>
                    <td>{currEle.deaths}</td>
                    <td>{currEle.active}</td>
                    <td>{currEle.lastupdatedtime}</td>
                </tr>
                    )
                })
            }
               
            </tbody>
            </table>
        </div>
        <ToastContainer />
    </div>
        
    </>
    )
}
export default Covid19Page;
