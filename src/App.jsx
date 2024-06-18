import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:articleId" element={<ArticleDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
