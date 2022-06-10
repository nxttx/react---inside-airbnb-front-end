import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import translate from '../core/language';


import "./Login.scss";
import login from "./Login.svg";


function Login(props) {

  return (
    <div className="login">
      <div className="window">
        <div className="header">
          {translate("signin_header")}
        </div>
        <div className="content">
          <p className="welcome">{translate("welcome")}</p>
          <button className="button" onClick={()=>props.login()}>
            <object data={login} type="image/svg+xml" > Microsoft logo </object>
            <p>{translate("login_with_azure")}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
