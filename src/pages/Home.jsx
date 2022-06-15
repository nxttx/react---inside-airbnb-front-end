import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTags, faStarHalfStroke} from '@fortawesome/free-solid-svg-icons';
import "./Home.scss";
import KamerListing from "../components/KamerListing";
import { getListings, getGeoData } from "../DataAccessLayer/getListings";
import translate, {ucFirst} from "../core/language";

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
                  ": &euro;" +
                  e.features[0].properties.price +
                  ",-<br>" +
                  translate("reviews") +
                  " : " +
                  e.features[0].properties.reviewScoresRating.toString().substring(0, 3) +
                  " / 5<br>" +
                  translate("neighberhood") +
                  ": " +
                  e.features[0].properties.neighbourhoodCleansed +
                  '<br>Url: <a target="_blank" href="' +
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


  function minPriceFilterChange(e){
    if(sessionStorage.getItem('currentFilters') === null){
      sessionStorage.setItem('currentFilters', '{"neighbourhood": "", "minPrice": "'+e.currentTarget.value+'", "maxPrice": "", "minRating": ""}');
    }else{
      let currentfilters = JSON.parse(sessionStorage.getItem('currentFilters'));
      currentfilters.minPrice = e.currentTarget.value;
      sessionStorage.setItem('currentFilters', JSON.stringify(currentfilters));
    }
    props.setUpdateMap(props.updateMap +1);
  }

  function maxPriceFilterChange(e){
    if(sessionStorage.getItem('currentFilters') === null){
      sessionStorage.setItem('currentFilters', '{"neighbourhood": "", "minPrice": "", "maxPrice": "'+e.currentTarget.value+'", "minRating": ""}');
    }else{
      let currentfilters = JSON.parse(sessionStorage.getItem('currentFilters'));
      currentfilters.maxPrice = e.currentTarget.value;
      sessionStorage.setItem('currentFilters', JSON.stringify(currentfilters));
    }
    props.setUpdateMap(props.updateMap +1);
  }

  function ratingFilterChange(e){
    if(sessionStorage.getItem('currentFilters') === null){
      sessionStorage.setItem('currentFilters', '{"neighbourhood": "", "minPrice": "", "maxPrice": "", "minRating": "' + e.currentTarget.value + '"}');
    }else{
      let currentfilters = JSON.parse(sessionStorage.getItem('currentFilters'));
      currentfilters.minRating = e.currentTarget.value;
      sessionStorage.setItem('currentFilters', JSON.stringify(currentfilters));
    }
    props.setUpdateMap(props.updateMap +1);
  }

  return (
    <main>
      <div className="item">
        <div className="listings">
          <div className="filter">
            <div className="filter-item">
              <FontAwesomeIcon icon={faTag} />
              <select value={JSON.parse(sessionStorage.getItem('currentFilters'))?.minPrice} onChange={minPriceFilterChange} >
                <option value="">{ucFirst(translate("min_prices"))}</option>
                <option value="0">0</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>

              </select>
            </div>
            <div className="filter-item">
              <FontAwesomeIcon icon={faTags} />
              <select value={JSON.parse(sessionStorage.getItem('currentFilters'))?.maxPrice} onChange={maxPriceFilterChange} >
                <option value="">{ucFirst(translate("max_prices"))}</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
                <option value='150'>150</option>
                <option value='200'>200</option>
              </select>
            </div>
            <div className="filter-item">
              <FontAwesomeIcon icon={faStarHalfStroke} />
              <select value={JSON.parse(sessionStorage.getItem('currentFilters'))?.minRating} onChange={ratingFilterChange}>
                <option value="">{ucFirst(translate("reviews"))}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <h2>Aanbevolen:</h2>
          {listings?.map((element) => (
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
