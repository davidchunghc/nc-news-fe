import { useEffect, useState } from "react";
import { fetchTopics } from "../utils/api.js";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topicError, setTopicError] = useState("");

  useEffect(() => {
    fetchTopics()
      .then((topicsFromApi) => {
        setTopics(topicsFromApi);
        setIsLoading(false);
      })
      .catch((error) => {
        setTopicError("Fetch topics failed!");
        setIsLoading(false);
        throw error;
      });
  }, []);

  if (isLoading) {
    return <p>Loading Topics...</p>;
  }

  if (topicError) return <p>{topicError}</p>;

  return (
    <section>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/articles?topic=${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Topics;
