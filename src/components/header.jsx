import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import getNeighbourhoods from '../DataAccessLayer/getNeighbourhoods.js';
import translate from '../core/language';

import "./Header.scss";
import headerLogo from "./Header.svg";

function Header() {

  const [neighbourhoods, setNeighbourhoods] = useState([]);

  useEffect(() =>{ 
    async function fetchData(){
      let data = await getNeighbourhoods();
      setNeighbourhoods(data);
    }
    fetchData();

  }, [])
  return (<>
    <header>
      <div className="container">
        <object data={headerLogo} type="image/svg+xml" > Airbnb logo </object>
        <div className="search_bar">
          <FontAwesomeIcon icon={faAngleDown} />
          <select>
            <option defaultChecked >{translate("default_search_bar")}</option>
            {neighbourhoods.map(element=> <option key={element}>{element}</option>)}
          </select>
        </div>
        <Link className="userprofile" to="/login">
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faUser} className="user" />

        </Link>
      </div>
    </header>
    <div className="clearfix"/>
    </>
  );
}

export default Header;
