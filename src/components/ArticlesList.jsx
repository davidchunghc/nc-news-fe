import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../utils/api.js";
import ArticleCard from "./ArticleCard.jsx";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles()
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Fetch article details failed");
        throw error;
      });
  }, []);

  if (isLoading) {
    return <p>Loading Articles...</p>;
  }

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Articles List</h2>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                <ArticleCard article={article} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default ArticlesList;
