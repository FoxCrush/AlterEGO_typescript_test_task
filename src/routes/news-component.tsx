import { Grid, Button, Box } from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Article from "../components/news/article";
import { INews } from "../types/interfaces";
import { RotatingLines } from "react-loader-spinner";

export default function NewsComponent() {
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
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {articles.map((article) => (
          <Article key={article.id} name={article.name} />
        ))}
      </Grid>
      {articles.length > 0 && !loading && (
        <Button
          size="large"
          sx={{ marginTop: "2em" }}
          onClick={loadMoreHandler}
        >
          Load more
        </Button>
      )}
      {loading && <RotatingLines />}
    </Box>
  );
}
