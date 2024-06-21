import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchArticles, fetchTopics } from "../utils/api.js";
import ArticleCard from "./ArticleCard.jsx";

const ArticlesList = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(
    new URLSearchParams(location.search).get("topic") || ""
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAndSetArticles = async () => {
      setIsLoading(true);
      try {
        const articlesFromApi = await fetchArticles(selectedTopic);
        setArticles(articlesFromApi);
        setIsLoading(false);
      } catch (err) {
        setError(
          `Fetch articles${
            selectedTopic ? ` for topic ${selectedTopic}` : ""
          } failed!`
        );
        setIsLoading(false);
      }
    };

    fetchAndSetArticles();
  }, [selectedTopic]);

  useEffect(() => {
    fetchTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
      })
      .catch((error) => {
        setError("Fetch topics failed!");
        console.error(error);
      });
  }, []);

  const performTopicChange = (event) => {
    const topic = event.target.value;
    setSelectedTopic(topic);
    const params = new URLSearchParams(location.search);
    if (topic) {
      params.set("topic", topic);
    } else {
      params.delete("topic");
    }
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  if (isLoading) {
    return <p>Loading Articles...</p>;
  }

  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>{selectedTopic ? `Articles on ${selectedTopic}` : "All Articles"}</h2>
      <label htmlFor="topic-select">Topic: </label>
      <select
        id="topic-select"
        value={selectedTopic}
        onChange={performTopicChange}
      >
        <option value="">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {topic.slug}
          </option>
        ))}
      </select>
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
