import axios from "axios";

//local
// export const GATEWAY_URL = `https://daily-fitness-api.24livehost.com`;
// export const GOOGLE_CLIENT_KEY = `790862085191-jofh2icrpk1gp8e38dlutd6l59uf10pb.apps.googleusercontent.com`
// export const redirect_url ='https://daily-fitness.24livehost.com/login-user'
// export const APPLE_CLIENT_ID = `com.thedailyfitness.web.login`

//prod
export const GATEWAY_URL = `https://api.dailyfitness.ai:3005`;
export const GOOGLE_CLIENT_KEY = `1025334248508-p80966cajrji9jlhh919cdtqas15pn57.apps.googleusercontent.com`;
export const APPLE_CLIENT_ID = `com.uat.dailyfitness.ai.app`;
export const redirect_url = "https://uat.dailyfitness.ai/login-user";

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

export const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase() // make the whole string lowercase
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const addScriptToHead = (src, id = "external-script") => {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.src = src;
  script.id = id;
  script.async = true;
  document.head.appendChild(script);
};

export const updateFaviconAndTitle = (iconUrl, title) => {
  try {
    // Parse and modify URL to remove the port
    const parsedUrl = new URL(iconUrl);
    parsedUrl.port = ""; // remove port
    const cleanedUrl = parsedUrl.toString();

    // Update favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/x-icon";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    } else {
      link.crossOrigin = "anonymous";
    }

    link.href = cleanedUrl;

    // Update title
    if (title) {
      document.title = title;
    }
  } catch (error) {
    console.error("Invalid icon URL:", iconUrl);
  }
};
