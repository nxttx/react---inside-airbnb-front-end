import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import "./Header.scss";
import headerLogo from "./Header.svg";

function Header() {
  return (<>
    <header>
      <div className="container">
        <object data={headerLogo} type="image/svg+xml" > Airbnb logo </object>
        <div className="search_bar">
          <FontAwesomeIcon icon={faAngleDown} />
          <select>
            <option defaultChecked >Begin je zoektocht</option>
            <option >Amsterdam</option>
            <option >Bijlmer-Centrum</option>
            <option >Bijlmer-Oost</option>
            <option >Bos en Lommer</option>
          </select>
        </div>
        <div className="userprofile">
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faUser} className="user" />

        </div>
      </div>
    </header>
    <div className="clearfix"/>
    </>
  );
}

export default Header;
