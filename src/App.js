// import logo from './logo.svg';
import Navbar from './components/Navbar'
import './App.css';
import News from './components/News'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    
    return (
        <Router>
      <div>


        <Navbar />

        <Routes>
          <Route exact path="/" element={<News key="home" pageSize={8} country="in" category="general"/>}></Route>
          <Route exact path="/Home" element={<News key="home" pageSize={8} country="in" category="general"/>}></Route>
          <Route exact path="/Business" element={<News key="business" pageSize={8} country="in" category="business"/>}></Route>
          <Route exact path="/Entertainment" element={<News key="entertainment" pageSize={8} country="in" category="entertainment"/>}></Route>
          <Route exact path="/Health" element={<News key="health" pageSize={8} country="in" category="health"/>}></Route>
          <Route exact path="/Science" element={<News key="science" pageSize={8} country="in" category="science"/>}></Route>
          <Route exact path="/Sports" element={<News key="sports" pageSize={8} country="in" category="sports"/>}></Route>
          <Route exact path="/Technology" element={<News key="technology" pageSize={8} country="in" category="technology"/>}></Route>
       

        </Routes>

        


      </div>
        </Router>
    )
  }
}

