import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

//moving으로 이동하기
export const moving = async (data) => {
  return await instance.post("board", data);
};

//전체글 가져오기(페이징+검색)
export const getBoards = async (page, keyword = "") => {
  return await instance.get("board", {
    params: {
      keyword,
      page,
    },
  });
};

//MBTI타입가져오기
export const mbtiBoards = async (mbtiType) => {
  return await instance.get(`board/${mbtiType}`);
};

//글작성 데이터가져오기
export const writeBoard = async (data) => {
  return await instance.post("board", data);
};

// 글1개 가져오기(결국 사용안했음)
export const getBoard = async (data) => {
  return await instance.get(`board/${data}`);
};

//조회수올리기
export const updateCount = async (no) => {
  return await instance.get(`board/${no}`);
};

/*
export const imgBoard = async (mbtiType, data) => {
  return await instance.post(`board${mbtiType}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
*/
