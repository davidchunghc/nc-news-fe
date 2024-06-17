import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-dc.onrender.com/api",
});

export const fetchArticles = () => {
  return ncNewsApi
    .get("/articles")
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      throw error;
    });
};

// https://be-nc-news-dc.onrender.com/api/articles
