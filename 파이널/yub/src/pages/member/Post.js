import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBoards } from "../../api/member";
import "../../assets/Post.scss";
import { addComment as addCommentAPI, getComments } from "../../api/comment";
import { createComment, fetchComment } from "../../store/commentSlice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Comment from "../../components/Comment";
import HotPosts from "../../components/HotPosts";
import { updateCount } from "../../api/member";

const Post = () => {
  const queryClient = useQueryClient();
  const { mbti } = useParams();
  const { no } = useParams();
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  const [isComment, setIsComment] = useState(false);
  const [comment, setComment] = useState({
    commentWriter: `익명의 ${mbti}`,
    commentContent: "",
    no: no,
  });

  //새로고침
  const updateboard = () => {
    window.location.reload();
  };

  //뒤로가기
  const back = () => {
    navigate(-1);
  };

  //boardAPI 불러오기
  const boardAPI = async () => {
    const result = await getBoards();
    setBoards(result.data.content);
  };

  useEffect(() => {
    boardAPI();
  }, []);

  const postOpen = async (no) => {
    await updateCount(no);
    navigate(`/Moving/${mbti}/post/${no}`);
  };

  // 여기부터 댓글 추가
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", no],
    queryFn: () => getComments(no),
    refetchInterval: 1000,
  });

  const addMutation = useMutation({
    mutationFn: addCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", no] });
    },
  });

  const addComment = () => {
    console.log(comment);
    addMutation.mutate(comment);
    setIsComment(false);
    setComment({
      ...comment,
      commentContent: "",
      ...comment,
      commentWriter: "",
    });
    updateboard();
  };

  if (isLoading) return <>로딩중</>;
  if (error) return <>Error</>;
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
          <section className="postSection">
            {boards.map(
              (board) =>
                board.no == no && (
                  <div className="postBoard">
                    <div className="postHeader">
                      <h2>제목 : {board.title}</h2>
                      <h3>작성자 : {board.writer}</h3>
                      <h3>작성일 : {board.writeDate}</h3>
                      <h3>조회수 : {board.count} 회</h3>
                    </div>
                    <div className="postMain">
                      <h2>내용</h2>
                      <p>{board.content}</p>
                    </div>
                  </div>
                )
            )}
            <div className="postFooter">
              <h2>댓글</h2>
              <input
                type="text"
                placeholder="댓글 작성"
                onChange={(e) =>
                  setComment({ ...comment, commentContent: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="작성자"
                onChange={(e) =>
                  setComment({ ...comment, commentWriter: e.target.value })
                }
              />

              <div className="commentBtn">
                <button onClick={addComment}>작성</button>
              </div>

              <div className="commentList">
                {comments.data.map(
                  (comment) =>
                    comment.no == no && (
                      <Comment comment={comment} />
                      /*
                      <div>
                        <h2>댓글 : {comment.commentContent}</h2>
                        <h3>작성자 : {comment.commentWriter}</h3>
                        <h3>작성일 : {comment.commentDate}</h3>
                      </div>
                      */
                    )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Post;
