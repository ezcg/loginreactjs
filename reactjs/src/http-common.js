import axios from "axios";
import configs from "./configs"

export default axios.create({
  baseURL: configs.apiUrl,
  headers: {
    "Content-type": "application/json"
  }
});
