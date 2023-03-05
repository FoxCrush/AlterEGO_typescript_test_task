import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
export default function Article({
  name,
  body,
  deleteArticleHandler,
  id,
}: {
  name: string;
  body: string;
  deleteArticleHandler: (id: number) => void;
  id: number;
}) {
  const { t } = useTranslation();
  return (
    <Grid item xs={12}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{body}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              deleteArticleHandler(id);
            }}
            size="small"
          >
            {t("delete")}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
