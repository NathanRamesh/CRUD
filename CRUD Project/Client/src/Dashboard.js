import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import {useEffect,useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import User from './User';
import Count from './Count';
import Femalecount from "./Femalecount";
import Above from "./Above";
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from "recharts";
import './App.css';

const Dashboard = () => {
    const[record,setRecord] = useState([]);
    const[refresh,setRefresh] = useState(false);
    const defaultMaterialTheme = createTheme();
    const getData = () =>
    {
        fetch('http://localhost:3003/user')
        .then(resposne=> resposne.json())
        .then(res=>setRecord(res))
    }
  
    useEffect(() => {
       getData();
    },[refresh])
     
    var malecount = record.filter(male => male.gender === "Male");
 
    var femalecount = record.filter(female => female.gender === "Female");
 
    var agecount = record.filter(count => count.age > 40);
 
    const piedata = [
     { name: "Total User", users: record.length, backgroundColor: "#FF6384" },
     { name: "Male", users: malecount.length },
     { name: "Female", users: femalecount.length },
     { name: "Age > 40", users: agecount.length },
   ];
return (
    <>
 
<div class="row mb-2">
<div class="col-xl-3 col-sm-6 py-2">
    <Link to='/dashboard/user'>
    <div class="card bg-success text-white h-100">
        <div class="card-body bg-success" style={{backgroundColor:"#57b960"}}>
            <div class="rotate">
                <i class="fa fa-user fa-4x"></i>
            </div>
            <h6 class="text-uppercase">Users</h6>
            <h1 class="display-4">{record.length}</h1>
        </div>
    </div>
    </Link>
</div>
<div class="col-xl-3 col-sm-6 py-2">
    <Link to="/dashboard/count">
    <div class="card text-white bg-danger h-100">
        <div class="card-body bg-danger">
            <div class="rotate">
            <i class="fas fa-male fa-4x"></i>
            </div>
            <h6 class="text-uppercase">Male</h6>
            <h1 class="display-4">{malecount.length}</h1>
        </div>
        
    </div>
    </Link>
</div>
<div class="col-xl-3 col-sm-6 py-2">
    <Link to="/dashboard/femalecount">
    <div class="card text-white bg-info h-100">
    <div class="card-body bg-danger">
            <div class="rotate">
            <i class="fas fa-female fa-4x"></i>
            </div>
            <h6 class="text-uppercase">Female</h6>
            <h1 class="display-4">{femalecount.length}</h1>
        </div>
    </div>
    </Link>
</div>
<div class="col-xl-3 col-sm-6 py-2">
    <Link to="/dashboard/above">
    <div class="card text-white bg-warning h-100">
        <div class="card-body">
            <div class="rotate">
                <i class="fa fa-share fa-4x"></i>
            </div>
            <h6 class="text-uppercase">Age Above 40</h6>
            <h1 class="display-4">{agecount.length}</h1>
        </div>
    </div>
    </Link>
</div>
</div>
<Routes>
<Route path="/above" element={<Above item={agecount}/>} />
<Route path="/count" element={<Count item={malecount}/>} />
<Route path="/femalecount" element={<Femalecount item={femalecount}/>} />
<Route path="/user" element={<User setRefresh={setRefresh}/>} />
</Routes>
<div class="row ">
<div class="col-lg-6 col-md-6 col-sm-12">
<h4 className='title mt-3 mb-3 text-center text-secondary'>Data in Bar-Chart</h4>
<BarChart
        width={500}
        height={300}
        data={piedata}
        margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
        }}
        barSize={20}
        >
        <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>

</div>

<div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
    <h4 className='title mt-3 text-center text-secondary'>Data in Pie-Chart</h4>
     <div className="m" style={{height:"300px",width:"400px"}}> 
     <PieChart width={500} height={300} backgroundColor={"#FF6384"}>
        <Pie
            dataKey="users"
            isAnimationActive={false}
            data={piedata}
            cx={250}
            cy={150}
            outerRadius={100}
            fill="#8884d8"
            label
        />
        <Tooltip />
        </PieChart>
     </div>
     </div>

</div>
   
</>
           
)
}

export default Dashboard