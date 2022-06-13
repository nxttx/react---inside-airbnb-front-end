import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "./Home.scss";
import KamerListing from "../components/KamerListing";
import { getListings, getGeoData } from "../DataAccessLayer/getListings";
import translate from "../core/language";

mapboxgl.accessToken =
  "pk.eyJ1Ijoibnh0dHgiLCJhIjoiY2wya2w0bXk4MDl5NjNrcWNiajdvNmU0dyJ9.hLimT3jYMyLLtyXQo6jmpw";

function Home(props) {
  const [listings, setListings] = useState([]);
  const [geoData, setGeoData] = useState([]);

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
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      let geodata = await getGeoData(false, true, true);
      setGeoData(geodata);

      function updateMap() {
        try {
          map.current.removeLayer("listings-circle");
        } catch (error) {}
        try {
          map.current.removeSource("listings");
        } catch (error) {}
        map.current.addSource("listings", {
          type: "geojson",
          data: geodata,

          cluster: true,
          clusterRadius: 20, // cluster two trailheads if less than 20 pixels apart
          clusterMaxZoom: 14, // display all trailheads individually from zoom 14 up
        });

        map.current.addLayer({
          id: "listings-circle",
          type: "circle",
          source: "listings",
          class: "marker",
          paint: {
            "circle-color": "RGBA(255,255,255,0.75)",
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#FF385C",

            "circle-radius": ["case", ["get", "cluster"], 10, 5], // 10 pixels for clusters, 5 pixels otherwise
          },
        });

        map.current.on("click", "listings-circle", (e) => {
          if (e.features[0].properties.listingUrl == undefined) {
            map.current.setZoom(map.current.getZoom() + 1);
            map.current.setCenter(e.lngLat);
          } else {
            // window.open(e.features[0].properties.listingUrl, "_blank").focus();

            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                translate("price") +
                  ": " +
                  e.features[0].properties.price +
                  "<br>" +
                  translate("reviews") +
                  " : " +
                  e.features[0].properties.reviewScoresRating +
                  "/5<br>" +
                  translate("neighberhood") +
                  ": " +
                  e.features[0].properties.neighbourhoodCleansed +
                  '<br>Url: <a href="' +
                  e.features[0].properties.listingUrl +
                  '" > ' +
                  e.features[0].properties.listingUrl +
                  "</a>"
              )
              .addTo(map.current);
          }
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.current.on("mouseenter", "listings-circle", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.current.on("mouseleave", "listings-circle", () => {
          map.current.getCanvas().style.cursor = "";
        });
      }

      map.current.on("load", () => {
        updateMap();
      });
      updateMap();
    }
    fetchData();
  }, [props.updateMap]);

  return (
    <main>
      <div className="item">
        <div className="listings">
          <h2>Aanbevolen airbnb's</h2>
          <br />
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
