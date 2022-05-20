import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import translate from '../core/language';


import "./KamerListing.scss";

function KamerListing(props) {

  function formatReviewScoresRating(number){
    let score = number.toString();
    if(score.length == 2 ){
      let a = score.slice();
      return a[0] + ',' +a[1];
    } else { //must be three
      let a = score.slice();
      return a[0] + a[1] +',' +a[2];
    }
  }

  return (
    <div className="listing">
      <div className="content">
        <div className="data">
          <div
            className="graph"
            style={{
              backgroundImage: 'url("' + props.data.thumbnail_url + '")',
            }}
          >
            {props.data.host_is_superhost ? (
              <div className="tag">
                <span>{translate("superhost")}</span>
              </div>
            ) : (
              <></>
            )}
            <img scr={props.data.thumbnail_url}></img>
          </div>
          <div className="body">
            <div className="topsubtitle">
              {props.data.room_type} in {props.data.neighbourhood}
            </div>
            <div className="title">{props.data.name}</div>
            <div className="seperator"></div>
            <div className="info">
              {props.data.accommodates} {(props.data.accommodates >1) ? translate("guests") : translate("guest")} <span className="dash">-</span> 
              {props.data.bedrooms} {(props.data.bedrooms >1) ? translate("bedrooms") : translate("bedroom")} <span className="dash">-</span> 
              {props.data.bathrooms} {(props.data.bathrooms <2) ? translate("bathrooms") : translate("bathroom")} <span className="dash">-</span> 
              {props.data.beds} {(props.data.beds >1) ? translate("beds") : translate("bed")}
            </div>
            <div className="reviews">
                <FontAwesomeIcon icon={faStar} />
                {formatReviewScoresRating(props.data.review_scores_rating)}
                <div className="outof">
                  ({props.data.number_of_reviews} {translate("reviews")})
                </div>
            </div>
          </div>
        </div>

        <div className="seperator"></div>
      </div>
    </div>
  );
}

export default KamerListing;
