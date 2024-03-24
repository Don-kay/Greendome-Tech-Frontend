export const addUserLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

//sets user token to localStorage

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserLocalStorage = async () => {
  const getToken =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userTok = getToken ? JSON.parse(getToken) : null;
  return userTok;
};
