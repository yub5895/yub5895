import Main from "../Main";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../../assets/Moving.scss";
import { useNavigate } from "react-router-dom";
import { getBoards, writeBoard } from "../../api/member";
import Modal from "../../components/Modal";

const Moving = () => {
  const { mbti } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const [boards, setBoards] = useState([]);
  const boardAPI = async () => {
    const result = await getBoards();
    setBoards(result.data);
  };
  useEffect(() => {
    boardAPI();
  }, []);

  const back = () => {
    navigate("/");
  };
  return (
    <main>
      <div className="head">
        <button type="button" onClick={back}>
          MBTIS
        </button>
        <div>{mbti} 놀이터</div>
      </div>

      <div className="boardMain">
        <section className="favorite">
          <div className="favHead">핫한 게시글</div>
          <div className="favMain">list</div>
        </section>

        <div className="boardMain2">
          <section className="boardHeader">
            <div className="header">
              <h1>게시글</h1>
            </div>
          </section>

          <section className="list">
            <div className="boardName">
              <p>
                <p className="board-item">번호</p>
                <h2 className="board-item">제목</h2>
                <p className="board-item">작성자</p>
                <p className="board-item">조회수</p>
                <p className="board-item">작성일</p>
              </p>
            </div>
            <div className="board">
              {boards.map((board) => (
                <div className="boardTitle">
                  <p className="board-item">{board.no}</p>
                  <h2 className="board-item">{board.title}</h2>
                  <p className="board-item">{board.writer}</p>
                  <p className="board-item">{board.count}</p>
                  <p className="board-item">{board.date}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="boardFooter">
            <input id="search" placeholder="검색" />
            <button id="searchButton">검색</button>
            <button id="write" onClick={open}>
              작성
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={close} />
    </main>
  );
};

export default Moving;
