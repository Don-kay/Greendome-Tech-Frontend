const loadState = () => {
  try {
    const serialized = localStorage.getItem("state");
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (error) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("state", serialized);
  } catch (error) {}
};
