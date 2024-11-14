import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBoards, getBoard } from "../../api/member";
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
  const [board, setBoard] = useState({
    no: no,
    title: "",
    writer: "",
  });
  const navigate = useNavigate();
  const [hotPosts, setHotPosts] = useState([]);

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
  const boardAPI = async (data) => {
    const result = await getBoard(data);
    console.log(result.data);
    setBoard(result.data);
  };
  const fetchHotPosts = useCallback(async () => {
    const result = await getBoards(1, "");
    const hotPostsData = result.data.content.filter(
      (board) => board.count >= 10
    );
    setHotPosts(hotPostsData);
  }, []);

  useEffect(() => {
    boardAPI(no);
    fetchHotPosts();
  }, [no]);

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

        <div>{mbti} HOME</div>
      </div>

      <div className="boardMain">
        <section className="favorite">
          <HotPosts boards={hotPosts} mbti={mbti} postOpen={postOpen} />
        </section>

        <div className="boardMain2">
          <section className="postSection">
            <div className="postBoard">
              <h2>{board.title}</h2>
              <div className="postHeader">
                <h3>
                  작성자 <p>{board.writer}</p>
                </h3>
                <h4>
                  작성일 <p>{board.writeDate}</p>
                </h4>
                <h4>
                  조회수 <p>{board.count} 회</p>
                </h4>
              </div>
              <div className="postMain">
                <img src={board.url}></img>
                <div>{board.content}</div>
              </div>
            </div>
            <div className="postFooter">
              <h2>댓글</h2>
              <input
                id="contentInput"
                type="text"
                placeholder="댓글 작성"
                onChange={(e) =>
                  setComment({ ...comment, commentContent: e.target.value })
                }
              />
              <input
                id="commentInput"
                type="text"
                placeholder="작성자"
                onChange={(e) =>
                  setComment({ ...comment, commentWriter: e.target.value })
                }
              />
              <button onClick={addComment} className="commentBtn">
                작성
              </button>
              <div className="commentList">
                {comments.data.map(
                  (comment, _index) =>
                    comment.no == no && (
                      <Comment comment={comment} key={_index} />
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
