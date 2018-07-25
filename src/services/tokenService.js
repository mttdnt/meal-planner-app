export const setToken = token => {
    localStorage.setItem("mpToken", token);
  };

  export const getToken = () => {
    return localStorage.getItem("mpToken");
  };

  export const removeToken = () => {
    localStorage.removeItem("mpToken");
  };