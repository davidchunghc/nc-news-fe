import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://be-nc-news-dc.onrender.com/api",
});

export const fetchArticles = (topic) => {
  const url = topic ? `/articles?topic=${topic}` : "/articles";
  return ncNewsApi
    .get(url)
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

export const addComment = (articleId, username, body) => {
  return ncNewsApi
    .post(`/articles/${articleId}/comments`, { username, body })
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteComment = (commentId) => {
  return ncNewsApi
    .delete(`/comments/${commentId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchTopics = () => {
  return ncNewsApi
    .get("/topics")
    .then((response) => {
      return response.data.topics;
    })
    .catch((error) => {
      throw error;
    });
};

// https://be-nc-news-dc.onrender.com/api/articles
