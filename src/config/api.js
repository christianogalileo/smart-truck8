const API_URL = (
  process.env.REACT_APP_API_URL ||
  "https://api.smart-card-bgr.web.id"
).replace(/\/+$/, "");

console.log("API_URL:", API_URL);

export default API_URL;