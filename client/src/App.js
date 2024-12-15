import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";

const apiButtonClick = () => {
    console.log("gonna make a call");
  fetch('http://localhost:3030')
  .then((response) => response.json())
  .then((data) => {
    //this console.log will be in our frontend console
    console.log("got data", data);
    setLibrary(data);
  })
  .catch(error => {
    console.error('Error: ', error);
  });
}

function App() {
  const [library, setLibrary] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3030')
    .then((response) => response.json())
    .then((data) => {
      setLibrary(data);
    })
    .catch(error => {
      console.error('Error: ', error);
    });

  }, []);

  return (
      
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route key={0} path="/pages" element={<Home />} />
          <Route key={1} path="/pages/about" element={<About />} />
        </Routes>
      </Router>
    
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={apiButtonClick}>Make API Call</button>
        </p>
        <p>Library:</p>
        {library.map((item) => <p key={item.key}>{JSON.stringify(item)}</p>
        )}

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
