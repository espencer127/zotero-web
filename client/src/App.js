import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    data,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";


//TODO there's errors when you click this 'api call' button
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
  const [currentCollection, setCurrentCollection] = useState([]);
  const [activeCollectionKey, setActiveCollectionKey] = useState('');

  useEffect(() => {
    fetch('http://localhost:3030')
    .then((response) => response.json())
    .then((data) => {
      setLibrary(data);
      console.log("got data of " + JSON.stringify(data));
    })
    .catch(error => {
      console.error('Error: ', error);
    });
 
  }, []);

  useEffect(() => {
    const getCollectionItems = async (collectionKey) => {
      const requestOptions = {
        method: 'POST'
      };
    
      const result = await fetch('http://localhost:3030/collectionItems/' + collectionKey, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("made a call for key " + collectionKey);
        console.log("got collection data", data);
        //return data;
        setCurrentCollection(data);
      })
      .catch(error => {
        console.error('Error: ', error);
      });

      //setCurrentCollection(result);
    }

    if (!((activeCollectionKey =="") || (activeCollectionKey.length==0))) {
      getCollectionItems(activeCollectionKey)
    }
  },[activeCollectionKey]);


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route key={0} path="/pages" element={<Home />} />
          <Route key={1} path="/pages/about" element={<About />} />
        </Routes>
      </Router>
    
      <header className="App-left">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        {/* {JSON.stringify(item)} */}
        <p>Collections:</p>
        {library.map(
          (item) => 
            <p key={item.key} style={{padding: 0}}>
              <button className="ButtonCSS" 
              onClick={
                () => {
                  setActiveCollectionKey(item.key); 
                console.log("current active collection key is " + activeCollectionKey); }
                }>
                  {item.data.name}
              </button>
            </p>
          )
        }

      </header>

      <header className="App-header">

        <p>Items:</p>
        {console.log("current collection is " + JSON.stringify(currentCollection))}
        { currentCollection ?
        currentCollection.map((item) => 
        <p key={item.key}>{JSON.stringify(item)}
        </p>
        ) : <p>oh no</p>}

      </header>

    </div>
  );

}

export default App;
