import axios from "axios";

export const GATEWAY_URL = `https://daily-fitness-api.24livehost.com`;
// export const GATEWAY_URL = `http://192.168.10.212:3005`

export const webAxios = axios.create({
  baseURL: `${GATEWAY_URL}/web`,
});

export const formatINRCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};
