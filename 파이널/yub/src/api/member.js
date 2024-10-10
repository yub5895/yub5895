import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const moving = async (data) => {
  return await instance.post("board", data);
};

export const getBoards = async () => {
  return await instance.get("board");
};

export const writeBoard = async (data) => {
  return await instance.post("board", data);
};
