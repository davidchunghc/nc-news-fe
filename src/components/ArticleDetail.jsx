import { useEffect, useState } from "react";
import { fetchArticleById } from "./api.jsx";
import { useParams } from "react-router-dom";
import "../App.css";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    fetchArticleById(articleId)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
      })
      .catch((error) => {
        throw error;
      });
  }, [articleId]);

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
        <p>Votes: {article.votes}</p>
        <div>
          <button className="voteButton">+</button>
          <button className="voteButton">-</button>
        </div>
      </li>
    </section>
  );
};

export default ArticleDetail;
