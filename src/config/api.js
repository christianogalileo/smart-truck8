const API_URL = (
  process.env.REACT_APP_API_URL ||
  "https://api.smart-card-bgr.web.id"
).replace(/\/$/, "");

export default API_URL;