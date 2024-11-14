import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  const date = new Date();
  return cookies.set(name, value, { ...options, maxAge: 604800 });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, options) => {
  return cookies.remove(name, { path: "/" }, { ...options, maxAge: 604800 });
};
