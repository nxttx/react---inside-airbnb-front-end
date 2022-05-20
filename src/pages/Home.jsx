import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Home.scss";
import KamerListing from "../components/KamerListing";
import getListings from "../DataAccessLayer/getListings";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibnh0dHgiLCJhIjoiY2wya2w0bXk4MDl5NjNrcWNiajdvNmU0dyJ9.hLimT3jYMyLLtyXQo6jmpw";

function Home() {
  const [listings, setListings] = useState([]);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(4.896407); //Amsterdam
  const [lat, setLat] = useState(52.37825); //Amsterdam
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    async function fetchData() {
      let data = await getListings();
      setListings(data);
      // Create a new marker.
      data.forEach(element=>new mapboxgl.Marker()
      .setLngLat([element.longitude, element.latitude])
      .addTo(map.current))
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className="item">
        <div className="listings">
          <h1>Inside Airbnb</h1>
          <h2>Adding data to the debate</h2>
          {listings.map((element) => (
            <KamerListing data={element} key={"Kamerlisting" + element.id} />
          ))}
        </div>
      </div>
      <div className="map item">
        <div ref={mapContainer} className="map-container" />
      </div>
    </main>
  );
}

export default Home;
