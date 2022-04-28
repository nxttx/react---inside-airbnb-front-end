import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './Router.css';
import Home from './pages/Home';


function Router() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default Router;