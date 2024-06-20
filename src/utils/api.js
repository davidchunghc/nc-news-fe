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

export const fetchArticleById = (articleId) => {
  return ncNewsApi
    .get(`/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateArticleVotes = (articleId, inc_votes) => {
  return ncNewsApi
    .patch(`/articles/${articleId}`, { inc_votes: inc_votes })
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchCommentsByArticleId = (articleId) => {
  return ncNewsApi
    .get(`/articles/${articleId}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      throw error;
    });
};

// https://be-nc-news-dc.onrender.com/api/articles
