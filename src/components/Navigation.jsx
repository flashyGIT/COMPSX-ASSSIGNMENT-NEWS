import { Link, useLocation } from 'react-router-dom';

import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useArticles } from "../context/ArticlesContext";

const Navigation = () => {
  const {
    user,
    logout,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const { getUserSavedArticles } = useArticles();

  return (
    <nav>
      <Link to="/">Home</Link>

      {isAuthenticated() && (
        <>
          <Link to="/saved">
            Saved Articles ({getUserSavedArticles().length})
          </Link>

          {isAdmin() && <Link to="/admin">Admin</Link>}

          <span>Welcome, {user.username}</span>

          <button onClick={logout}>Logout</button>
        </>
      )}

      {!isAuthenticated() && (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
