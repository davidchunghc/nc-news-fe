import { useEffect, useState } from "react";
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
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};
export default ArticlesList;
