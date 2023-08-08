//此文件夹封装了存储方法
const GEEK_TOKEN = "geek_token";

export const getToken = () => localStorage.getItem(GEEK_TOKEN);

export const setToken = (token) => localStorage.setItem(GEEK_TOKEN, token);

export const removeToken = () => localStorage.removeItem(GEEK_TOKEN);

export const hasToken = () => !!getToken();
