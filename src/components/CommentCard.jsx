import { useState } from "react";
import { deleteComment } from "../utils/api.js";

const CommentCard = ({ comment, loggedInUser, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [delSuccessMsg, setDelSuccessMsg] = useState("");

  const performDelete = () => {
    setIsDeleting(true);
    setDeleteError("");
    setDelSuccessMsg("");

    deleteComment(comment.comment_id)
      .then(() => {
        onDelete(comment.comment_id);
      })
      .catch((error) => {
        setDeleteError("Failed to delete comment. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <div className="comment-card">
      <h5>{comment.author} </h5>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      {loggedInUser === comment.author && (
        <button onClick={performDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting Comment" : "Delete"}
        </button>
      )}
      {deleteError && <p>{deleteError}</p>}
      {delSuccessMsg && <p>{delSuccessMsg}</p>}
    </div>
  );
};

export default CommentCard;
