import axios from "axios";

const api = axios.create({
  	baseURL: "https://api.netmotors.com.br/api/v1/" 
});

export default api
