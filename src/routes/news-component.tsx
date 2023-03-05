import { Grid, Button, Box } from "@mui/material";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import Article from "../components/news/article";
import { INews } from "../types/interfaces";
import { RotatingLines } from "react-loader-spinner";
import { fetchAdditionalPosts } from "../services/jsonplaceholder-api";

export default function NewsComponent() {
  const { t } = useTranslation();
  const currentPage = useRef(1);
  const [articles, setArticles] = React.useState<INews[]>(
    useLoaderData() as INews[]
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const loadMoreHandler = () => {
    currentPage.current += 1;
    fetchAdditionalPosts(currentPage.current)
      .then((response) => response.json())
      .then((result) => {
        setArticles((prevArticles) => {
          return prevArticles.concat(result);
        });
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  const deleteArticle = (id: number) => {
    setArticles((prevArticles) => {
      return prevArticles.filter((article) => {
        return article.id !== id;
      });
    });
  };

  return (
    <Box sx={{ padding: "1em" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 12, sm: 2, md: 3 }}>
        {articles.map((article) => (
          <Article
            key={article.id}
            id={article.id}
            name={article.name}
            body={article.body}
            deleteArticleHandler={deleteArticle}
          />
        ))}
      </Grid>
      <div style={{ marginTop: "2em" }}>
        {!loading && (
          <Button size="large" onClick={loadMoreHandler}>
            {t("loadMore")}
          </Button>
        )}
        {loading && <RotatingLines width="42" />}
      </div>
    </Box>
  );
}
