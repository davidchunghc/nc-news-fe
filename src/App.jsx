// testtest

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticlesList from "./components/ArticlesList";
import ArticleDetail from "./components/ArticleDetail";
import Topics from "./components/Topics";

function App() {
  const loggedInUser = "jessjelly";
  return (
    <BrowserRouter>
      <div>
        <Header username={loggedInUser} />
        <Nav />
        <Routes>
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/topics" element={<Topics />} />
          <Route
            path="/articles/:articleId"
            element={<ArticleDetail username={loggedInUser} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
