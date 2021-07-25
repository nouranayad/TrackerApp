import logo from './logo.svg';
import './App.css';
import React from 'react';
import Form from "./components/Form"
import Bar from "./components/Bar"
import Map from './components/Map';


function App() {
  return (
  <div>
    <Bar></Bar>
    <Form></Form>
    <Map></Map>
    {/* <Maptest></Maptest> */}
  </div>
  );
}

export default App;
