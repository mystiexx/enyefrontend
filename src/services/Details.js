import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = `${apiUrl}`;


export async function getDetails(page) {
    let response = await http.get(`${apiEndpoint}?page=${page}`);
    return response
}
