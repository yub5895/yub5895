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
      commentWriter: "",
      parentCode: 0,
    });
  };
  return (
    <main>
      <div>{comment.commentWriter}</div>
      <div>{comment.commentContent}</div>
      <div>{comment.commentDate}</div>

      <div>
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

      {newReply.parentCode === comment.commentCode && (
        <>
          <input
            type="text"
            placeholder="답글 내용"
            value={newReply.commentContent}
            onChange={(e) =>
              setNewReply({ ...newReply, commentContent: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="작성자"
            value={newReply.commentWriter}
            onChange={(e) =>
              setNewReply({ ...newReply, commentWriter: e.target.value })
            }
          />
          <button onClick={addReply}>작성</button>
        </>
      )}
      {comment.replies?.map((reply) => (
        <div key={reply.commentCode}>
          <div>{`#${comment.commentWriter}`}</div>
          <Comment comment={reply} no={no} />
        </div>
      ))}
    </main>
  );
};

export default Comment;
