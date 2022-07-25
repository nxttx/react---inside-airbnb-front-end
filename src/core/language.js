export default function translate(id){
  if(sessionStorage.getItem('language') === null){
    sessionStorage.setItem('language', 'nl');
  }

  let lang = {
    nl_default_search_bar : "Begin je zoektocht",
    en_default_search_bar : "Start your search",
    nl_superhost : "Superhost",
    en_superhost : "Superhost",
    nl_guests : "gasten",
    en_guests : "guests",
    nl_guest : "gast",
    en_guest : "guest",
    nl_bedrooms : "slaapkamers",
    en_bedrooms : "bedrooms",
    nl_bedroom : "slaapkamer",
    en_bedroom : "bedrooms",
    nl_bathrooms: "badkamers",
    en_bathrooms: "bathrooms",
    nl_bathroom: "badkamer",
    en_bathroom: "bathroom",
    nl_beds: "bedden",
    en_beds: "beds",
    nl_bed : "bed",
    en_bed : "bed",
    nl_reviews : "recensies",
    en_reviews : "reviews",
    nl_review : "recensie",
    en_review : "review",
    nl_price : "prijs",
    en_price : "price",
    nl_neighberhood: "buurt",
    en_neighberhood: "neighborhood",
    nl_signin_header: "Inloggen of aanmelden",
    en_signin_header: "Signin or signup",
    nl_welcome: "Welkom bij Airbnb",
    en_welcome: "Welcome to Airbnb",
    nl_login_with_azure: "Doorgaan met Microsoft account",
    en_login_with_azure: "Continue with Microsoft account",
    nl_username: "Gebruikersnaam",
    en_username: "Username",
    nl_password: "Wachtwoord",
    en_password: "Password",
    nl_signin: "Aanmelden",
    en_signin: "Signin",
    nl_min_prices: "Laagste prijs",
    en_min_prices: "Lowest price",
    nl_max_prices: "Hoogste prijs",
    en_max_prices: "Highest price",
    nl_recommended: "Aanbevolen",
    en_recommended: "Recommended",
  };

  let result = lang[sessionStorage.getItem('language')+"_"+id]
  if(result == null){
    result = "UNKNOWN: " +  sessionStorage.getItem('language')+"_"+id;
  }
  return result 
}

export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
