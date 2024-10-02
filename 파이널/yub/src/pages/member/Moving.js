import Main from "../Main";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../../assets/Moving.scss";
import { useNavigate } from "react-router-dom";

const Moving = () => {
  const { mbti } = useParams();
  const navigate = useNavigate();

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

      <section className="favorite">
        <div className="favHead">즐겨찾기</div>
        <div className="favMain">list</div>
      </section>

      <section className="boardHeader">
        <div className="header">
          <h1>게시글</h1>
        </div>
      </section>
      <section className="list">
        <div className="board">ㅎㅇㅎㅇ</div>
        <div className="boardFooter">
          <input id="search" placeholder="검색" />
          <button id="searchButton">검색</button>
          <button id="write">작성</button>
        </div>
      </section>
    </main>
  );
};

export default Moving;
