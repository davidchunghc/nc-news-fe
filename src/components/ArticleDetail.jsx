import { useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsByArticleId, updateArticleVotes } from "../utils/api.js";
import { useParams } from "react-router-dom";
import "../App.css";
import CommentCard from "./CommentCard.jsx";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteError, setVoteError] = useState("");

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
      <p>Votes: {article.votes}</p>
      <div>
          <button
            className="voteButton"
            onClick={() => updateVote(1)}
            disabled={voted}
          >
            +
          </button>
          <button
            className="voteButton"
            onClick={() => updateVote(-1)}
            disabled={voted}
          >
            -
          </button>
        </div>

      <h3>Comments</h3>
      <div>
        {comments.length === 0 ? (
          <p>No comments yet, be the first person to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
};

export default ArticleDetail;
