import { useEffect, useState } from "react";
import { fetchArticleById, updateArticleVotes } from "../utils/api.js";
import { useParams } from "react-router-dom";
import "../App.css";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [error, setError] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState(false);
  const [voteError, setVoteError] = useState("");

  useEffect(() => {
    fetchArticleById(articleId)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setVoteCount(articleFromApi.votes);
      })
      .catch((error) => {
        setError("Fetch article details failed");
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section>
      <li>
        <h2>Topic: {article.topic}</h2>
        <h3>Title: {article.title}</h3>
        <h4>Author: {article.author}</h4>
        <img src={article.article_img_url} />
        <p>Body: {article.body}</p>
        <p>Created at: {formatDate(article.created_at)}</p>
        <p>Votes: {voteCount}</p>
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
      </li>
    </section>
  );
};

export default ArticleDetail;
