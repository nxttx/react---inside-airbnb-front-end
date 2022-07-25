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
  //dispaly submenu 
  const [displaySubmenu, setDisplaySubmenu] = useState(false);

  // toggle submenu
  function toggleSubmenu (){
    setDisplaySubmenu(!displaySubmenu);
  }

  function changeLanguage() {
    if(sessionStorage.getItem('language') === null){
      sessionStorage.setItem('language', 'nl');
    } else {
      let lang = sessionStorage.getItem('language');
      if(lang === 'nl'){
        sessionStorage.setItem('language', 'en');
      } else {
        sessionStorage.setItem('language', 'nl');
      }
    }
    // update map to soft relaod page
    props.setUpdateMap(props.updateMap +1);

  }


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

  return (<>
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <object data={headerLogo} type="image/svg+xml" > Airbnb logo </object>
        </Link>
        <div className="search_bar">
          <FontAwesomeIcon icon={faAngleDown} />
          <select value={JSON.parse(sessionStorage.getItem('currentFilters'))?.neighbourhood} onChange={neighbourhoodChange} >
            <option value="" >{translate("default_search_bar")}</option>
            {neighbourhoods.map(element=> <option key={element} value={element}>{element}</option>)}
          </select>
        </div>
          <div className="userprofile">
            <FontAwesomeIcon icon={faBars} onClick={toggleSubmenu}/>
            <Link  to="/login">
              <FontAwesomeIcon icon={faUser} className="user" />
            </Link>
          </div>
      </div>

      {displaySubmenu && 
        <div className="submenu " onClick={toggleSubmenu}>
          <div>
            <Link className="submenu-item fat" to="/login">
              <div>
                {translate("sign_up")}
              </div>
            </Link>
            <Link className="submenu-item fat" to="/login">
              <div>
                {translate("sign_in")}
              </div>
            </Link>
            <div className="linebreak"/>
            <a className="submenu-item" onClick={changeLanguage} >
              <div>
                {translate("change_language")}
              </div>
            </a>
            <div className="linebreak"/>
            <a className="submenu-item" onClick={()=>{alert("Please send a mail to Robert@robertboudewijn.nl")}} >
              <div>
                {translate("assistance")}
              </div>
            </a>
            <a className="submenu-item" onClick={()=>{alert("Please send a mail to Robert@robertboudewijn.nl")}} >
              <div>
                {translate("contact")}
              </div>
            </a>
          </div>
        </div>
      }
    </header>
    <div className="clearfix"/>
    </>
  );
}

export default Header;
