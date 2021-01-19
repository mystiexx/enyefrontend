import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = `${apiUrl}`;


export function getDetails() {
    return http.get(apiEndpoint);
}
