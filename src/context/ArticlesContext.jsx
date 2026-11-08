i
import React, {
  createContext,
  useContext,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const ArticlesContext = createContext(null);

export const ArticlesProvider = ({ children }) => {
  const { user } = useAuth();

  const [savedArticlesByUser, setSavedArticlesByUser] =
    useState({});

  const username = user?.username;

  const getUserSavedArticles = () => {
    if (!username) return [];
    return savedArticlesByUser[username] || [];
  };

  const saveArticle = (article) => {
    if (!username) return;

    setSavedArticlesByUser((prev) => ({
      ...prev,
      [username]: [
        ...(prev[username] || []).filter(
          (item) => item.uri !== article.uri
        ),
        article,
      ],
    }));
  };

  const removeArticle = (article) => {
    if (!username) return;

    setSavedArticlesByUser((prev) => ({
      ...prev,
      [username]: (prev[username] || []).filter(
        (item) => item.uri !== article.uri
      ),
    }));
  };

  const isArticleSaved = (article) => {
    return getUserSavedArticles().some(
      (item) => item.uri === article.uri
    );
  };

  const getAllUserArticles = () => savedArticlesByUser;

  return (
    <ArticlesContext.Provider
      value={{
        savedArticlesByUser,
        getUserSavedArticles,
        getAllUserArticles,
        saveArticle,
        removeArticle,
        isArticleSaved,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
