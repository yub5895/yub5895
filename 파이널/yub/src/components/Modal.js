import { useState } from "react";
import "../assets/Modal.scss";
import { writeBoard } from "../api/member";
import { useParams } from "react-router-dom";

const Modal = ({ isOpen, onClose }) => {
  const { mbti } = useParams();
  const [content, setContent] = useState({
    no: "",
    title: "",
    writer: `익명의 ${mbti}`,
    content: "",
    mbtiType: mbti,
    boardFile: null,
  });

  const fileUpload = (e) => {
    setContent({
      ...content,
      boardFile: e.target.files[0],
    });
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append("title", content.title);
    formData.append("writer", content.writer);
    formData.append("content", content.content);
    formData.append("mbtiType", content.mbtiType);
    formData.append("boardFile", content.boardFile);

    console.log([...formData]);

    const result = await writeBoard(formData);
    updateboard(result.data.content);
    onClose();
  };
  /*
  const imgUpload = async () => {
    const formData = new FormData();
    formData.append("url", content.url);
    const result = await writeBoard(formData);
    updateboard(result.data);
    onClose();
  };
*/
  const updateboard = () => {
    window.location.reload();
  };

  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <h1>게시글 작성</h1>
          <button id="close" onClick={onClose}>
            X
          </button>
        </div>
        <hr></hr>
        <div className="modal-main">
          <div className="modal-title">
            <h2 className="h2Title">제목</h2>
            <h2 className="h2Writer">작성자</h2>
          </div>
          <div className="modal-title2">
            <input
              id="inputTitle"
              type="text"
              onChange={(e) =>
                setContent({ ...content, title: e.target.value })
              }
            ></input>
            <input
              id="inputWriter"
              type="text"
              onChange={(e) =>
                setContent({ ...content, writer: e.target.value })
              }
            ></input>
          </div>
          <div className="modal-title">
            <h2 className="h2Title">이미지 첨부</h2>
          </div>
          <div className="modal-title2">
            <input type="file" id="inputImg" onChange={fileUpload}></input>
          </div>
          <div className="modal-title">
            <h2 className="h2Title">내용</h2>
          </div>
          <div id="modalContent" className="modal-title2">
            <textarea
              id="inputContent"
              onChange={(e) =>
                setContent({ ...content, content: e.target.value })
              }
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <hr></hr>
          <button id="complete" onClick={upload}>
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
