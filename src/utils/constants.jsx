import axios from "axios";

// export const GATEWAY_URL =`https://daily-fitness.24livehost.com:3005`
export const GATEWAY_URL = `http://192.168.10.212:3005`
  
  export const webAxios= axios.create({
    baseURL: `${GATEWAY_URL}/web`
  });