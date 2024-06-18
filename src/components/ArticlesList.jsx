import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "./api.jsx";
import ArticleCard from "./ArticleCard.jsx";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

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
