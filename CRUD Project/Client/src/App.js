import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import {useState} from 'react';
import User from './User';
import Dashboard from "./Dashboard";
import './App.css';
 
 const App = ()=>{
    const[refresh,setRefresh] = useState(false);
    return (
        <> 
        <div class="col main">
            <div className="header">
                <h1>CRUD</h1>
            </div> 
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/user">Users</Link></li>
        </ol>
        </nav>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/user" element={<User setRefresh={setRefresh} />} />
  </Routes>
    </div>
  </>
    )
 }

export default App