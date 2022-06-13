import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import translate from '../core/language';


import "./Login.scss";
import login from "./Login.svg";


function Login(props) {
  function formHandler(e){
    e.preventDefault();
    alert("Not implemented yet");
  }

  return (
    <div className="login">
      <div className="window">
        <div className="header">
          {translate("signin_header")}
        </div>
        <div className="content">
          <p className="welcome">{translate("welcome")}</p>
          <br/>

          <form onSubmit={formHandler}>
            <div className="form-group">
              <input type="text" className="form-control" id="username" placeholder={translate("username")} />
            </div>
            <div className="form-group">
              <label htmlFor="password"></label><br/>
              <input type="password" className="form-control" id="password" placeholder={translate("password")} />
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">{translate("signin")}</button>
          </form>

          <br/>
          <hr/>
          <br/>
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
