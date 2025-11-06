import axios from "axios";
import { config } from "../config";

const instance = axios.create({
    baseURL: config.apiURL,
    headers: {
        'Content-Type': 'application/json',
      },
  });
  export { instance };