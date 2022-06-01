import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import getNeighbourhoods from '../DataAccessLayer/getNeighbourhoods.js';
import translate from '../core/language';

import "./Header.scss";
import headerLogo from "./Header.svg";

function Header(props) {

  const [neighbourhoods, setNeighbourhoods] = useState([]);

  useEffect(() =>{ 
    async function fetchData(){
      let data = await getNeighbourhoods();
      setNeighbourhoods(data);
    }
    fetchData();

  }, [])


  function neighbourhoodChange(e){
    if(sessionStorage.getItem('currentFilters') === null){
      sessionStorage.setItem('currentFilters', '{"neighbourhood": "'+e.currentTarget.value+'", "minPrice": "", "maxPrice": "", "minRating": ""}');
    }else{
      let currentfilters = JSON.parse(sessionStorage.getItem('currentFilters'));
      currentfilters.neighbourhood = e.currentTarget.value;
      sessionStorage.setItem('currentFilters', JSON.stringify(currentfilters));
    }
    props.setUpdateMap(props.updateMap +1);
  }
console.log(props)
  return (<>
    <header>
      <div className="container">
        <object data={headerLogo} type="image/svg+xml" > Airbnb logo </object>
        <div className="search_bar">
          <FontAwesomeIcon icon={faAngleDown} />
          <select onChange={neighbourhoodChange} >
            <option defaultChecked value="" >{translate("default_search_bar")}</option>
            {neighbourhoods.map(element=> <option key={element} value={element}>{element}</option>)}
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
