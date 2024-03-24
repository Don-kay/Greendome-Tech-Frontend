import axios from "axios";

const profiles = await axios.get(
  "http://localhost:8000/greendometech/ng/auth/users",
  { withCredentials: true, credentials: "include" }
);
return profiles.data;

// const useAuth = (req, res) => {
//   // const token = req.headers.cookie;
//   // console.log(req.headers.cookie);
//   console.log(req);
// };

// export default useAuth;
//  const fetch = (url, options = {}) => {
//     options.headers = options.headers || {};
//     options.headers.Authorization = `Bearer ${token}`;
//     return fetch(url, options);
//   };
