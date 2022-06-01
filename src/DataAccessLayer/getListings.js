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

  if (GeoJson) {
    let data = JSON.parse(sessionStorage.getItem('geoData'));
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
        }, 
        geometry: {
          type: 'Point',
          coordinates: [element.longitude, element.latitude]
        }
      });
    });

    return geoJson;
  }

  return (JSON.parse(sessionStorage.getItem('geoData')));
}