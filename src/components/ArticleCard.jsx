import { useState } from "react";

const ArticleCard = ({ article }) => {
  return (
    <section>
      <li>
        <h3>Topic: {article.topic}</h3>
        <h4>Title: {article.title}</h4>
        <h5>Author: {article.author}</h5>
        <p>Body: {article.body}</p>
        <p>Votes: {article.votes}</p>
      </li>
    </section>
  );
};
export default ArticleCard;
