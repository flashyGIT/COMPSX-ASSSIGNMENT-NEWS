
import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useArticles } from "../context/ArticlesContext";

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const { getAllUserArticles } = useArticles();

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  const allArticles = getAllUserArticles();

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {Object.entries(allArticles).map(([username, articles]) => (
        <section key={username}>
          <h2>{username}'s Saved Articles</h2>

          {articles.map((article) => (
            <article key={article.uri}>
              <h3>{article.title}</h3>
              <p>{article.abstract}</p>
            </article>
          ))}
        </section>
      ))}
    </div>
  );
};

export default AdminPage;
