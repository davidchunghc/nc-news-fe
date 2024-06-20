import { useState } from "react";
import { addComment } from "../utils/api.js";

const CommentForm = ({ articleId, loggedInUser, addCommentBody }) => {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [commentError, setCommentError] = useState("");

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setCommentError("");

    console.log(">>> upload data:", {
      articleId,
      username: loggedInUser,
      body,
    });

    addComment(articleId, loggedInUser, body)
      .then((comment) => {
        addCommentBody(comment);
        setBody("");
        setSuccessMsg("Comment posted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      })
      .catch((error) => {
        setCommentError("Failed to post comment. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <p>Here is comment form!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <textarea
            name="body"
            value={body}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
        </label>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting Comment" : "Upload Comment"}
        </button>
        {commentError && <p>{commentError}</p>}
      </form>
    </div>
  );
};

export default CommentForm;
