import axios from "axios"

export async function loadBand(bandUsername) {
    const bandData = await axios.get(
      `http://localhost:3001/users/${bandUsername}`
    );
    return bandData;
  }

export function getClientInfo(client){
  const clientRes =  axios.get(`http://localhost:3001/users/${client}`);
  return clientRes;
}