import { useDispatch, useSelector } from "react-redux";
import { hidePost, addHotPost } from "../store/hotSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "../store/cookie";
import "../assets/HotPost.scss";
import { FaFire } from "react-icons/fa";
import Paging from "./Paging";

const HotPosts = ({ boards, postOpen }) => {
  const { mbti } = useParams();

  return (
    <div>
      <div className="favHead">
        <div>
          <FaFire className="fireIcon" />
        </div>
        <h3>핫한 게시글</h3>
      </div>

      <div className="favContainer">
        {boards.map(
          (board) =>
            board.mbtiType === mbti &&
            board.count >= 10 &&
            getCookie(`postCookie${board.no}`) && (
              <div className="favMain" key={board.no}>
                <h2
                  onClick={() => {
                    postOpen(board.no);
                  }}
                >
                  {board.title.slice(0, 8)} [{board.count}]
                </h2>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default HotPosts;
