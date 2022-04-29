import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './Router.scss';
import Home from './pages/Home';
import Header from "./components/Header";


function Router() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default Router;