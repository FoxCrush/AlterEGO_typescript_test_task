import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

export default function ProfileComponent() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: "50vw",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h3" gutterBottom>
        My profile
      </Typography>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom>
          My name
        </Typography>
        <img
          width="200px"
          src="public/Profile_avatar_placeholder_large.png"
          alt="selfy"
        />
        <Typography variant="h5" gutterBottom>
          My information
        </Typography>
      </Stack>
    </Box>
  );
}
