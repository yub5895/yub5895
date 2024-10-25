import { useDispatch, useSelector } from "react-redux";
import { hidePost } from "../store/hotSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "../store/cookie";

const HotPosts = ({ boards, postOpen }) => {
  const { mbti } = useParams();
  const dispatch = useDispatch();
  const showTime = useSelector((state) => state.hotPost.time);
  const hidden = useSelector((state) => state.hotPost.hidden);
  const [cookies, setCookies] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hidePost());
    }, 5000);
    removeCookie(cookies);
  }, [dispatch]);

  // 데이터삭제를 위한 쿠키코드들
  /*
  const onSet = () => {
    setCookie("cookieKey", "cookieValue", {
      path: "/",
      secure: true,
      maxAge: 3000,
    });
  };

  const onGet = () => {
    const getValue = getCookie("cookieKey");
    console.log(getValue);
  };

  const onRemove = () => {
    removeCookie("cookieKey");
    console.log("cookeyKey");
  };
*/
  return (
    <div>
      <div className="favHead">핫한 게시글</div>
      {boards.map(
        (board) =>
          board.mbtiType === mbti &&
          board.count >= 10 &&
          showTime &&
          !hidden && (
            <>
              <div className="favMain" key={board.no}>
                <h2
                  onClick={() => {
                    postOpen(board.no);
                  }}
                >
                  {board.title}
                </h2>
              </div>
            </>
          )
      )}
    </div>
  );
};

export default HotPosts;
