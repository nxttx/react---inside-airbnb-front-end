import { IP } from "../core/GLOBAL";


async function getNeighbourhoods(clear = false) {
  if(sessionStorage.getItem('neighbourhoods') === null || clear){
    let request = await fetch(IP+"/neighbourhoods", {method:"get"});
    let response = await request.text();
    sessionStorage.setItem('neighbourhoods', response);
  }
  
  return (JSON.parse(sessionStorage.getItem('neighbourhoods')));
}

export default getNeighbourhoods;
