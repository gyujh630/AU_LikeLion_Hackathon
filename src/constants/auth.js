export const setLogin = (token, category) => {
  localStorage.setItem("token", token);
  localStorage.setItem("category", category);
};

export const setLogOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("category");
};

export const isLogin = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else return false;
};

export const getUserCategory = () => {
  return localStorage.getItem("category");
};
