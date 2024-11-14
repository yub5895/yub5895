import { useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, getComments } from "../api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../assets/Comment.scss";

const Comment = ({ comment }) => {
  const queryClient = useQueryClient();
  const { mbti } = useParams();
  const { no } = useParams();
  const [newReply, setNewReply] = useState({
    commentCode: 0,
    commentWriter: `익명의 ${mbti}`,
    commentContent: "",
    no: no,
    parentCode: 0,
  });

  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", no] });
    },
  });

  const addReply = () => {
    addMutation.mutate(newReply);
    setNewReply({
      ...newReply,
      commentContent: "",
      commentWriter: `익명의 ${mbti}`,
      parentCode: 0,
    });
  };

  return (
    <main>
      <div className="comment-container">
        <div id="writerDiv">
          <h2>@{comment.commentWriter}</h2>
          <h3>{comment.commentDate}</h3>
        </div>
        <div id="contentDiv">
          <h3>{comment.commentContent}</h3>
          <div className="replyDiv">
            <button
              onClick={() =>
                setNewReply((prev) => ({
                  ...prev,
                  parentCode:
                    prev.parentCode === comment.commentCode
                      ? null
                      : comment.commentCode,
                }))
              }
            >
              답글
            </button>
          </div>
        </div>
      </div>

      <div className="reply-container">
        {newReply.parentCode === comment.commentCode && (
          <>
            <input
              id="contentReply"
              type="text"
              placeholder="답글 내용"
              value={newReply.commentContent}
              onChange={(e) =>
                setNewReply({ ...newReply, commentContent: e.target.value })
              }
            />
            <input
              id="writerReply"
              type="text"
              placeholder="작성자"
              // value={newReply.commentWriter}
              onChange={(e) =>
                setNewReply({ ...newReply, commentWriter: e.target.value })
              }
            />
            <button onClick={addReply}>작성</button>
            <button
              onClick={() =>
                setNewReply({
                  ...newReply,
                  commentContent: "",
                  commentWriter: "",
                  parentCode: 0,
                })
              }
            >
              취소
            </button>
          </>
        )}
      </div>
      {comment.replies?.map((reply) => (
        <div key={reply.commentCode} className="reply-items">
          <span className="arrow">&#8627;</span>
          <div className="tagDiv">
            <span>{`#${comment.commentWriter}`}</span>
          </div>
          <Comment comment={reply} no={no} />
        </div>
      ))}
    </main>
  );
};

export default Comment;
