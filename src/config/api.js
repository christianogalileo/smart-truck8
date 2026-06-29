const API_URL = (
  API_URL?.trim() ||
  "https://api.smart-card-bgr.web.id"
).replace(/\/+$/, "");

console.log("API_URL:", API_URL);

export default API_URL;