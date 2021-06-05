import axios from "axios"

export async function loadBand(bandUsername) {
    const bandData = await axios.get(
      `https://bandquest-bandend.herokuapp.com/users/${bandUsername}`
    );
    return bandData;
  }

export function getClientInfo(client){
  const clientRes =  axios.get(`https://bandquest-bandend.herokuapp.com/users/${client}`);
  return clientRes;
}