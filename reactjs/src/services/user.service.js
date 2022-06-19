import axios from "axios";
import authHeader from "./auth-header";
import configs from "../configs";

const API_URL = configs.apiUrl;

const getUserBoard = () => {
  let headerObj = authHeader();
  return axios.get(API_URL + "user",  {data:{}, headers: headerObj });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", {data:{},  headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", {data:{},  headers: authHeader() });
};

let obj = {
  getUserBoard,
  getModeratorBoard,
  getAdminBoard
}

export default obj
