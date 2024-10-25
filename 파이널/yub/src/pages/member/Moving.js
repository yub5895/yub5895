import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../../assets/Moving.scss";
import { useNavigate } from "react-router-dom";
import { getBoards, getBoard, updateCount } from "../../api/member";
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import Count from "../../components/Count";
import { increase, countItem } from "../../store/countSlice";
import HotPosts from "../../components/HotPosts";
// import { setCookie, getCookie } from "../../store/cookie";

const Moving = () => {
  const { mbti } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [plus, setPlus] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showTime, setShowTime] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [cookies, setCookies] = useState();

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

  const [boards, setBoards] = useState([]);

  //boardAPI 불러오기
  const boardAPI = useCallback(async (page, keyword) => {
    const result = await getBoards(page, keyword);
    console.error(result.data.totalPages);
    setBoards(result.data.content);
    setCookies(result.data.content);
    console.log(result.data.content.title);
    // const postToken = result.data.postToken;
    // setCookie("postToken", postToken);
  }, []);

  useEffect(() => {
    boardAPI(page, keyword);
  }, [page, keyword, boardAPI]);
  /*
  useEffect(() => {
    setTimeout(() => {
      setShowTime(false);
    }, 5000);
  }, []);
*/
  const search = (keyword) => {
    setKeyword(keyword);
  };

  // 뒤로가기
  const back = () => {
    navigate("/");
  };

  // 게시글 이동
  const postOpen = async (no) => {
    await updateCount(no);
    navigate(`/Moving/${mbti}/post/${no}`);
  };

  const paging = () => {
    if (boards.length >= 20) {
      setPage((page) => page + 1);
    }
    setPages(setPage);
  };
  /*
  useEffect(() => {
    window.addEventListener("paging", paging);
    return () => {
      window.removeEventListener("paging", paging);
    };
  }, [setPage]);
*/
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
          <HotPosts boards={boards} mbti={mbti} postOpen={postOpen} />
        </section>

        <div className="boardMain2">
          <section className="boardHeader">
            <div className="header">
              <h1>게시글</h1>
            </div>
            <input
              id="search"
              placeholder="검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button id="searchButton" onClick={() => search(keyword)}>
              검색
            </button>
            <button id="write" onClick={open}>
              작성
            </button>
          </section>

          <section className="list">
            <div className="boardName">
              <p>
                <p className="board-item">No.</p>
                <h2 className="board-item">제목</h2>
                <p className="board-item">작성자</p>
                <p className="board-item">조회수</p>
                <p className="board-item">작성일</p>
              </p>
            </div>
            <div className="board">
              {boards.map(
                (board) =>
                  board.mbtiType === mbti && (
                    <div
                      className="boardTitle"
                      key={board.no}
                      data-code={board.no}
                    >
                      <p className="board-item">{board.no}</p>
                      <h2
                        className="board-item"
                        onClick={() => {
                          postOpen(board.no);
                        }}
                      >
                        {board.title}
                      </h2>
                      <p className="board-item">{board.writer}</p>
                      <p className="board-item">{board.count}회</p>
                      <p className="board-item">{board.writeDate}</p>
                    </div>
                  )
              )}
            </div>
          </section>

          <div className="boardFooter">
            {pages.map((page) => (
              <div>
                <button value={page}>{paging}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={close} />
    </main>
  );
};

export default Moving;
