import axios from "axios";

const axiosUser = axios.create({
  baseURL: "http://172.105.42.17:4000/user/gl_api/v2",
});

export default axiosUser;
