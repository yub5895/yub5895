import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/member/",
});

export const mvoing = async (data) => {
  return await instance.post("Board");
};
