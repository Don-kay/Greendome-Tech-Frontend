import axios from "axios";
import { getUserLocalStorage } from "./localStorage";

axios.defaults.withCredentials = true;
const customFetch = axios.create({
  baseURL: "http://localhost:8000/greendometech/ng",
});

// customFetch.interceptors.request.use((config) => {
//     config.headers.common["Cookie"] = `myToken=${user.token}`;
//   }
//   return config;
// });

export default customFetch;
