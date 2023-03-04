import { Grid, Button, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import Article from "../components/news/article";
import { INews } from "../types/interfaces";
import { RotatingLines } from "react-loader-spinner";

export default function NewsComponent() {
  const { t } = useTranslation();
  const [articles, setArticles] = React.useState<INews[]>(
    useLoaderData() as INews[]
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const loadMoreHandler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <Box sx={{ padding: "1em" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 12, sm: 2, md: 3 }}>
        {articles.map((article) => (
          <Article key={article.id} name={article.name} />
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
