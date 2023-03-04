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
export default function Article({ name }) {
  const { t } = useTranslation();
  return (
    <Grid item xs={12}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae,
            optio?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
            suscipit molestias sapiente aliquam illo! Ducimus et dolorem autem
            nesciunt hic.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{t("delete")}</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
