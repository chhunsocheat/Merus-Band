import axios from "axios"

export async function loadBand(bandUsername) {
    const bandData = await axios.get(
      `http://localhost:3001/users/${bandUsername}`
    );
    return bandData;
  }