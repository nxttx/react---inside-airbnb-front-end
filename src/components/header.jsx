import * as React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import headerLogo from "./Header.svg";

function Header() {
  return (
    <header>
      <div className="container">
        <object data={headerLogo} type="image/svg+xml" > Airbnb logo </object>
        <div className="search_bar">
          <select>
          <option defaultChecked >Begin je zoektocht</option>
            <option >Amsterdam</option>
            <option >Bijlmer-Centrum</option>
            <option >Bijlmer-Oost</option>
            <option >Bos en Lommer</option>
          </select>
        </div>
        <object data={headerLogo} type="image/svg+xml" > Airbnb logo </object>

      </div>
    </header>
  );
}

export default Header;
