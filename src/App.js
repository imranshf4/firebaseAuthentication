import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './components/Home/Home';

import NotFound from './components/NotFound/NotFound';
import Sign_in from './components/Sign_in/Sign_in';

function App() {

  return (
    <div>
      <Header></Header>
      <Router>
        <div>
          <Routes>
            {/* <Route exact path="/" element={<Home count={category} setCount={setCategory}></Home>} /> */}
            <Route exact path="/" element={<Home></Home>} />
            <Route exact path="/sign_in" element={<Sign_in></Sign_in>} />
            
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </Router>


    </div>
  );
}

export default App;
