import axios from "axios";

//local 
export const GATEWAY_URL = `https://daily-fitness-api.24livehost.com`;
export const GOOGLE_CLIENT_KEY = `790862085191-jofh2icrpk1gp8e38dlutd6l59uf10pb.apps.googleusercontent.com`
export const redirect_url ='https://daily-fitness.24livehost.com/login-user'
export const APPLE_CLIENT_ID = `com.thedailyfitness.web.login`

//prod 
// export const GATEWAY_URL =`https://api.dailyfitness.ai:3005`
// export const GOOGLE_CLIENT_KEY = `1025334248508-p80966cajrji9jlhh919cdtqas15pn57.apps.googleusercontent.com`
// export const APPLE_CLIENT_ID = `thedailyfitness.domainname.appname`
// export const redirect_url ='https://uat.dailyfitness.ai/login-user'

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
