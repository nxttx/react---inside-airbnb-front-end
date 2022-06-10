import React, { useRef, useEffect, useState } from "react";
import { config } from "../authentication/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import Login from "../components/Login";
import "./Admin.scss";

function Admin(props) {
  // auth //
  const [error, setError] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [publicClientApplication, setpublicClientApplication] = React.useState(
    new PublicClientApplication({
      auth: {
        clientId: config.appId,
        redirectUri: config.redirectURL,
        authority: config.authority,
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
      },
    })
  );

  // stop auth //

  async function login() {
    try {
      await publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: "select_account",
      });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  }

  function logout() {
    publicClientApplication.logout();
  }

  return (
    <>
      {!isAuthenticated ? 
      <Login login={login}/> 
      : 
      <canvas className="myChart">loggedin!</canvas>
      }
    </>
  );
}

export default Admin;
