import { useState } from "react";

const CommentCard = ({ comment, loggedInUser, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const performDelete = () => {
    setIsDeleting(true);
    setDeleteError("");

    onDelete(comment.comment_id)
      .then(() => {
        setIsDeleting(false);
      })
      .catch((error) => {
        setDeleteError("Delete comment failed!");
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
    </div>
  );
};

export default CommentCard;
