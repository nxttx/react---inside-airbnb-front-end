import { IP } from "../core/GLOBAL";


export async function getListings(clear = false) {
  if (sessionStorage.getItem('listings') === null || clear) {
    let request = await fetch(IP + "/listings", { method: "get" });
    let response = await request.text();
    sessionStorage.setItem('listings', response);
  }

  return (JSON.parse(sessionStorage.getItem('listings')));
}


export async function GetGeoData(clear = false, GeoJson = false) {
  if (sessionStorage.getItem('geoData') === null || clear) {
    let request = await fetch(IP + "/listings/geodata", { method: "get" });
    let response = await request.text();
    sessionStorage.setItem('geoData', response);
  }

  let data = JSON.parse(sessionStorage.getItem('geoData'));

  if(sessionStorage.getItem('currentFilters') !== null){
    let currentFilters = JSON.parse(sessionStorage.getItem('currentFilters'));
    if(currentFilters.minPrice !== "" || currentFilters.maxPrice !== "" || currentFilters.neighbourhood !== "" || currentFilters.minRating !== ""){
      // filter on items that match the current filters combined and not combined
      data = data.filter(item => {
        let match = false;
        if(currentFilters.minPrice !== "" && item.price < currentFilters.minPrice){
          match = true;
        }
        if(currentFilters.maxPrice !== "" && item.price > currentFilters.maxPrice){
          match = true;
        }
        if(currentFilters.neighbourhood !== "" && currentFilters.neighbourhood === item.neighbourhoodCleansed){
          match = true;
        }
        if(currentFilters.minRating !== null && item.rating < currentFilters.minRating){
          match = true;
        }
        return match;
      });
    }
  }

  if (GeoJson) {
    let geoJson = {
      type: 'FeatureCollection',
      features: []
    };
    data.forEach(element => {
    
      geoJson.features.push({
        type: 'Feature',
        properties: {
          price: element.price,
          listingUrl: element.listingUrl,
          reviewScoresRating: element.reviewScoresRating,
          neighbourhoodCleansed: element.neighbourhoodCleansed,
        }, 
        geometry: {
          type: 'Point',
          coordinates: [element.longitude, element.latitude]
        }
      });
    });

    return geoJson;
  }

  return (data);
}