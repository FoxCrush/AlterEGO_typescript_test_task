import { Grid, Button, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import Article from "../components/news/article";
import { INews } from "../types/interfaces";
import { RotatingLines } from "react-loader-spinner";
import { fetchInitialPosts } from "../services/jsonplaceholder-api";

export default function NewsComponent() {
  const { t } = useTranslation();
  const [articles, setArticles] = React.useState<INews[]>(
    useLoaderData() as INews[]
  );
  const [articlesToShow, setArticlesToShow] = React.useState<INews[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const loadMoreHandler = () => {
    fetchInitialPosts()
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
    setArticlesToShow((prevArticles) => {
      return prevArticles.filter((article) => {
        return article.id !== id;
      });
    });
  };
  React.useEffect(() => {
    if ((articles.length > 0, articles)) {
      setArticlesToShow(
        articles.filter((_, index) => {
          return index % 50 == 0;
        })
      );
    }
  }, [articles]);

  return (
    <Box sx={{ padding: "1em" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 12, sm: 2, md: 3 }}>
        {articlesToShow.map((article) => (
          <Article
            key={article.id}
            id={article.id}
            name={article.title}
            body={article.body}
            deleteArticleHandler={deleteArticle}
          />
        ))}
      </Grid>
      <div style={{ marginTop: "2em" }}>
        {articles.length > 0 && !loading && (
          <Button size="large" onClick={loadMoreHandler}>
            {t("loadMore")}
          </Button>
        )}
        {loading && <RotatingLines width="42" />}
      </div>
    </Box>
  );
}
