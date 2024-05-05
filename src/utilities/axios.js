import axios from "axios";
import { getUserLocalStorage } from "./localStorage";

axios.defaults.withCredentials = true;
const customFetch = axios.create({
  baseURL: "http://localhost:8000/greendometech/ng",
});
export const customFetchProduction = axios.create({
  baseURL: "https://greendome.onrender.com",
});
// export const customFetchProduction = axios.create({
//   baseURL: "https://greendome.onrender.com",
// });
export const customSitebase = axios.create({
  baseURL: "https://greendometech.onrender.com",
});

export const Fetch =
  process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;

// customFetch.interceptors.request.use((config) => {
//     config.headers.common["Cookie"] = `myToken=${user.token}`;
//   }
//   return config;
// });

export default customFetch;
