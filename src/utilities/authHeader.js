const authHeader = (thunkAPI) => {
  return {
    headers: {
      authorization: `Bearer ${thunkAPI.getState().user.user.payload}`, //swaped user for token
    },
  };
};

export default authHeader;
