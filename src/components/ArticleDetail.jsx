import { useEffect, useState } from "react";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleVotes,
  deleteComment,
} from "../utils/api.js";
import { useParams } from "react-router-dom";
import "../App.css";
import CommentCard from "./CommentCard.jsx";
import CommentForm from "./CommentForm.jsx";
import Popup from "./Popup.jsx";

const ArticleDetail = ({ username }) => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteError, setVoteError] = useState("");
  const [delSuccessMsg, setDelSuccessMsg] = useState("");
  const [delErrorMsg, setDelErrorMsg] = useState("");

  useEffect(() => {
    fetchArticleById(articleId)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setVoteCount(articleFromApi.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Fetch article details failed");
        throw error;
      });

    fetchCommentsByArticleId(articleId)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
      })
      .catch((error) => {
        setError("Fetch comments failed");
        throw error;
      });
  }, [articleId]);

  const updateVote = (incrementValue) => {
    setVoteCount((currentVoteCount) => currentVoteCount + incrementValue);
    setVoted(true);

    updateArticleVotes(articleId, incrementValue).catch((error) => {
      setVoteCount((currentVoteCount) => currentVoteCount - incrementValue);
      setVoteError("Cannot update vote!");
      setVoted(false);
      throw error;
    });
  };

  const handleCommentBody = (newComment) => {
    setComments((previousComments) => [newComment, ...previousComments]);
  };

  const performDeleteComment = (commentId) => {
    return deleteComment(commentId)
      .then(() => {
        setComments((previousComments) =>
          previousComments.filter((comment) => comment.comment_id !== commentId)
        );
        setDelSuccessMsg("Comment deleted successfully!");
        setDelErrorMsg("");
      })
      .catch((error) => {
        setDelErrorMsg("Delete comment failed!");
        throw error;
      });
  };

  const closePopup = () => {
    setDelSuccessMsg("");
    setDelErrorMsg("");
  };

  if (error) return <p>{voteError}</p>;

  if (isLoading) {
    return <p>Loading Article...</p>;
  }

  if (error) return <p>{error}</p>;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section>
      <h2>Topic: {article.topic}</h2>
      <h3>Title: {article.title}</h3>
      <h4>Author: {article.author}</h4>
      <img src={article.article_img_url} />
      <p>Body: {article.body}</p>
      <p>Created at: {formatDate(article.created_at)}</p>
      <p>Votes: {voteCount}</p>
      <div>
        <button
          className="vote-button"
          onClick={() => updateVote(1)}
          disabled={voted}
        >
          +
        </button>
        <button
          className="vote-button"
          onClick={() => updateVote(-1)}
          disabled={voted}
        >
          -
        </button>
      </div>

      <h3>Comments</h3>
      {(delSuccessMsg || delErrorMsg) && (
        <Popup message={delSuccessMsg || delErrorMsg} onClose={closePopup} />
      )}
      <CommentForm
        articleId={articleId}
        loggedInUser={username}
        addCommentBody={handleCommentBody}
      />
      <div>
        {comments.length === 0 ? (
          <p>No comments yet, be the first person to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              loggedInUser={username}
              comment={comment}
              onDelete={performDeleteComment}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ArticleDetail;
