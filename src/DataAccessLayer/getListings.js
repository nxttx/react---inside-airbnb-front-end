import { IP } from "../core/GLOBAL";


async function getListings(clear = false) {
  if(sessionStorage.getItem('listings') === null || clear){
    let request = await fetch(IP+"/listings", {method:"get"});
    let response = await request.text();
    sessionStorage.setItem('listings', response);
  }
  
  return (JSON.parse(sessionStorage.getItem('listings')));
}

export default getListings;
