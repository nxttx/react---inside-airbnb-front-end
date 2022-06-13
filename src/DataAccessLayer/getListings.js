import { IP } from "../core/GLOBAL";


export async function getListings(clear = false) {
  if (sessionStorage.getItem('listings') === null || clear) {
    let request = await fetch(IP + "/listings", { method: "get" });
    let response = await request.text();
    sessionStorage.setItem('listings', response);
  }

  return (JSON.parse(sessionStorage.getItem('listings')));
}


export async function getGeoData(clear = false, GeoJson = false, useFiter = false ) {
  if (sessionStorage.getItem('geoData') === null || clear) {
    let request = await fetch(IP + "/listings/geodata", { method: "get" });
    let response = await request.text();
    sessionStorage.setItem('geoData', response);
  }

  let data = JSON.parse(sessionStorage.getItem('geoData'));
  if(useFiter){
    if(sessionStorage.getItem('currentFilters') !== null){
      let currentFilters = JSON.parse(sessionStorage.getItem('currentFilters'));
      if(currentFilters.minPrice !== "" || currentFilters.maxPrice !== "" || currentFilters.neighbourhood !== "" || currentFilters.minRating !== ""){
        // filter on items that match the current filters combined and not combined
        data = data.filter(item => {
          // todo edit: match moet altijd true zijn, als een filter item niet klopt  
          let match = true;
          if(currentFilters.minPrice !== "" && parseInt(item.price) < currentFilters.minPrice){
            match = false;
          }
          if(currentFilters.maxPrice !== "" && parseInt(item.price) > currentFilters.maxPrice){
            match = false;
          }
          if(currentFilters.neighbourhood !== "" && currentFilters.neighbourhood !== item.neighbourhoodCleansed){
            match = false;
          }
          if(currentFilters.minRating !== null && parseInt(item.rating) < parseInt(currentFilters.minRating)){
            match = false;
          }
          return match;
        });
        
      }
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

export async function getAveragePricesOfNeighbourhoods() {
  let data =  await getGeoData();
  
  // calculate average prices of neighbourhoods from data 
  let averagePrices = {};
  data.forEach(element => {
    if(averagePrices[element.neighbourhoodCleansed] === undefined){
      averagePrices[element.neighbourhoodCleansed] = {price : 0, count : 0};
    }
    averagePrices[element.neighbourhoodCleansed].price += Number(element.price);
    averagePrices[element.neighbourhoodCleansed].count += 1;
  })

  // calculate average prices of neighbourhoods from data
  let averagePricesOfNeighbourhoods = [];
  for (let key in averagePrices) {
    averagePricesOfNeighbourhoods.push({
      neighbourhood: key,
      avaragePrice: averagePrices[key].price / averagePrices[key].count
    });
  }

  return averagePricesOfNeighbourhoods;
}

export async function getAverageReviewScoresOfNeighbourhoods() {
  let data =  await getGeoData();

  // calculate average prices of neighbourhoods from data 
  let avarageReviewScore = {};
  data.forEach(element => {
    if(avarageReviewScore[element.neighbourhoodCleansed] === undefined){
      avarageReviewScore[element.neighbourhoodCleansed] = {reviewScore : 0, count : 0};
    }
    avarageReviewScore[element.neighbourhoodCleansed].reviewScore += Number(element.reviewScoresRating);
    avarageReviewScore[element.neighbourhoodCleansed].count += 1;
  })

  // calculate average prices of neighbourhoods from data
  let avarageReviewScoreOfNeighbourhoods = [];
  for (let key in avarageReviewScore) {
    avarageReviewScoreOfNeighbourhoods.push({
      neighbourhood: key,
      reviewScoresRating: avarageReviewScore[key].reviewScore / avarageReviewScore[key].count
    });
  }

  return avarageReviewScoreOfNeighbourhoods;
}

export async function getAmountOflistingsPerNeighbourhood() {
  let data =  await getGeoData();

  // calculate amout of listings per neighbourhood from data
  let amountOfListingsPerNeighbourhood = {};
  data.forEach(element => {
    if(amountOfListingsPerNeighbourhood[element.neighbourhoodCleansed] === undefined){
      amountOfListingsPerNeighbourhood[element.neighbourhoodCleansed] = 0;
    }
    amountOfListingsPerNeighbourhood[element.neighbourhoodCleansed] += 1;
  })

  // calculate amout of listings per neighbourhood from data
  let amountOfListingsPerNeighbourhoods = [];
  for (let key in amountOfListingsPerNeighbourhood) {
    amountOfListingsPerNeighbourhoods.push({
      neighbourhood: key,
      amountOfListings: amountOfListingsPerNeighbourhood[key]
    });

    amountOfListingsPerNeighbourhoods.sort((a, b) => {
      return b.amountOfListings - a.amountOfListings;
    }
    );

  }

  return amountOfListingsPerNeighbourhoods;
}