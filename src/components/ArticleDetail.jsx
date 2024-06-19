import { useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsByArticleId } from "../utils/api.js";
import { useParams } from "react-router-dom";
import "../App.css";
import CommentCard from "./CommentCard.jsx";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticleById(articleId)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
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
        <button className="vote-button">+</button>
        <button className="vote-button">-</button>
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
