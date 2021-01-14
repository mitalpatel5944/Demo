import { create } from "apisauce";
import { URL } from "../../app/config";
const API_VERSION = "api";
const API_VERSION_AFTER = 'API'

const api = create({
  baseURL: `${URL}/${API_VERSION}/${API_VERSION_AFTER}/`,
  headers: { Accept: "application/json" }
});

export default api;
