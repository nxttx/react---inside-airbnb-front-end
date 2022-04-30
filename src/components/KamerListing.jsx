import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import "./KamerListing.scss";

function KamerListing(props) {
  return (
    <div className="listing">
      <div className="content">
        <div className="data">
          <div className="graph">
            <div className="tag">
              <span>{props.tag}</span>
            </div>
          </div>
          <div className="body"></div>
        </div>

        <div className="seperator"></div>
      </div>
    </div>
  );
}

export default KamerListing;
