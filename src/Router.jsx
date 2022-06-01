import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './Router.scss';
import Home from './pages/Home';
import Header from "./components/Header";


function Router() {
  const [updateMap, setUpdateMap] = React.useState(1); //Amsterdam
  
  return (
    <>
      <Header setUpdateMap={setUpdateMap} updateMap={updateMap}></Header>
      <Routes>
        <Route path="/" element={<Home updateMap={updateMap}/>} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default Router;