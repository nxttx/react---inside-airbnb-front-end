import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Home.scss";
import KamerListing from "../components/KamerListing";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibnh0dHgiLCJhIjoiY2wya2w0bXk4MDl5NjNrcWNiajdvNmU0dyJ9.hLimT3jYMyLLtyXQo6jmpw";

function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <main className="">
      <div>

        <div className="listings">
          <h1>Inside Airbnb</h1>
          <h2>Adding data to the debate</h2>
          <KamerListing tag="Room Type" />
          <KamerListing tag="Activity" />
          <KamerListing tag="Licenses" />
          <KamerListing tag="Short-Term Rentals" />
          <KamerListing tag="Listings per Host" />
          <KamerListing tag="Activity" />


        </div>
      </div>
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    </main>
  );
}

export default Home;
