import React from "react";
import styles from "./login-form.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Backdrop, Typography } from "@mui/material";

export default function FormPropsTextFields() {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget === event.target) {
      setOpen(false);
    }
  };
  return (
    <Backdrop
      onClick={handleClose}
      open={open}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <div className={styles.container}>
        <Typography variant="h4" gutterBottom>
          Please, authorize
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="outlined-required" label="Name" />
            <TextField
              id="outlined-password-input-required"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <Button variant="outlined">Return</Button>
        </Box>
      </div>
    </Backdrop>
  );
}
