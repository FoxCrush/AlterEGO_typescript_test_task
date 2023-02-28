import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { INews } from "../../types/interfaces";

export default function NewsComponent() {
  const [articles, setArticles] = React.useState<INews[]>(
    useLoaderData() as INews[]
  );

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {articles.map((article) => (
        <Grid item xs={6} key={article.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {article.name}
              </Typography>
              <Typography variant="body2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Beatae, optio?Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Odit suscipit molestias sapiente aliquam illo!
                Ducimus et dolorem autem nesciunt hic.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
