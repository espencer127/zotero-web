import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
const { getPosts } = require('./api-call.js');

const apiCall = () => {
    console.log("gonna make a call");
  fetch('http://localhost:8080')
  .then((response) => response.json())
  .then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            <button onClick={apiCall}>Make API Call</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
