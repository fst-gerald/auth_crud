import axios from "axios";
import { API_BASE_URL } from "./Constants";

export module Axios {
    export const client = axios.create({
        baseURL: API_BASE_URL,
        withCredentials: true,
      })
}