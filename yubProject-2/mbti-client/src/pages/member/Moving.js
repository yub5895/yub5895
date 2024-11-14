import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../../assets/Moving.scss";
import { useNavigate } from "react-router-dom";
import { getBoards, updateCount } from "../../api/member";
import Modal from "../../components/Modal";
import HotPosts from "../../components/HotPosts";
import Paging from "../../components/Paging";
import { useLocation } from "react-router-dom";
import { setCookie, getCookie } from "../../store/cookie";
import { IoIosSearch } from "react-icons/io";
// import { setCookie, getCookie } from "../../store/cookie";

const Moving = ({ Link }) => {
  const { mbti } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page")) || 1;
  const [boards, setBoards] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);

  /*
  const countPlus = () => {
    setPlus(plus + 1);
  };
  */

  //게시글작성 열기

  const open = () => {
    setIsOpen(true);
  };

  //게시글작성 닫기
  const close = () => {
    setIsOpen(false);
  };

  const filterHotPosts = useCallback(async () => {
    const result = await getBoards(1, "");
    const hotPostsData = result.data.content.filter(
      (board) => board.count >= 10
    );
    setHotPosts(hotPostsData);
  }, []);

  //boardAPI 불러오기
  const boardAPI = useCallback(
    async (page, keyword, mbti) => {
      const result = await getBoards(page, keyword, mbti);
      setTotalPages(result.data.totalPages);
      console.log(result.data.totalPages);

      const filteredBoards = result.data.content.filter(
        (board) => board.mbtiType === mbti
      );
      setBoards(filteredBoards.reverse());
    },

    [page, keyword, mbti]
  );

  useEffect(() => {
    boardAPI(page, keyword, mbti);
    filterHotPosts();
  }, [page, keyword, mbti]);

  // 뒤로가기
  const back = () => {
    navigate("/");
  };

  // 게시글 이동
  const postOpen = (no) => {
    navigate(`/Moving/${mbti}/post/${no}`);
  };

  const pageOpen = async () => {
    navigate(`/Moving/${mbti}/${page}`);
  };

  const cookieClick = (boardno) => {
    const now = Date.now();
    const board = boards.find((e) => e.no === boardno);
    if (board.count === 9) {
      setCookie(`postCookie${board.no}`, now, { path: "/" });
    }
  };

  return (
    <main>
      <div className="head">
        <button type="button" onClick={back}>
          MBTIS
        </button>
        <div>{mbti} HOME</div>
      </div>

      <div className="boardMain">
        <section className="favorite">
          <HotPosts boards={hotPosts} mbti={mbti} postOpen={postOpen} />
        </section>

        <div className="boardMain2">
          <section className="boardHeader">
            <div className="header"></div>
          </section>

          <section className="list">
            <div className="boardName">
              <p>
                <p className="item-no">No.</p>
                <h2 className="item-title">제목</h2>
                <p className="item-writer">작성자</p>
                <p className="item-count">조회</p>
                <p className="item-date">작성일</p>
              </p>
            </div>
            <div className="board">
              {boards.map((board) =>
                board.mbtiType === mbti ? (
                  <div
                    className="boardTitle"
                    key={board.no}
                    data-code={board.no}
                  >
                    <p className="item-no">{board.no}</p>
                    <h2
                      className="item-title"
                      onClick={() => {
                        postOpen(board.no);
                        cookieClick(board.no);
                      }}
                    >
                      {board.title}
                    </h2>
                    <p className="item-writer">{board.writer}</p>
                    <p className="item-count">{board.count}회</p>
                    <p className="item-date">{board.writeDate}</p>
                  </div>
                ) : null
              )}
            </div>
          </section>

          <div className="boardFooter">
            <Paging
              page={page}
              totalPages={totalPages}
              onClick={() => {
                {
                  pageOpen();
                }
              }}
            />
            <input
              id="search"
              placeholder="제목 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <IoIosSearch className="searchIcon" />
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
