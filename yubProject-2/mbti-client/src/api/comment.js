import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addComment = async (data) => {
  return await instance.post("comment", data);
};

export const getComments = async (no) => {
  return await instance.get(`board/${no}/comment`);
};
