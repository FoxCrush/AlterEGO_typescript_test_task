import React from "react";
import styles from "./login-form.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Backdrop, Typography, Alert } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleVisible, setToken } from "../../redux/user-slice";
import { validateInput } from "../../services/validation";

const userToken = 333222444;

export default function FormPropsTextFields() {
  const [errorMessage, setErrorMessage] = React.useState<string>("error");
  const [errorAlertIsVisible, setErrorAlertIsVisible] =
    React.useState<boolean>(false);
  const [nameInputValue, setNameInputValue] = React.useState<string>("");
  const [passwordInputValue, setPasswordInputValue] =
    React.useState<string>("");
  const loginVisible = useAppSelector((state) => state.users.isAuthFormVisible);
  const dispatch = useAppDispatch();
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget === event.target) {
      dispatch(toggleVisible());
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "name":
        setNameInputValue(e.currentTarget.value);
        break;
      case "password":
        setPasswordInputValue(e.currentTarget.value);
        break;

      default:
        break;
    }
  };
  const signInBtnHandler = () => {
    if (nameInputValue.length > 0 && passwordInputValue.length > 0) {
      if (!validateInput(nameInputValue, passwordInputValue)) {
        setErrorMessage("Name or Password are incorrect");
        setErrorAlertIsVisible(true);
      } else {
        setNameInputValue("");
        setPasswordInputValue("");
        setErrorMessage("");
        setErrorAlertIsVisible(false);
        dispatch(toggleVisible());
        dispatch(setToken(userToken));
      }
      console.log("login: ", validateInput(nameInputValue, passwordInputValue));
    } else {
      setErrorMessage("Name and Password are required");
      setErrorAlertIsVisible(true);
      console.log("login: ", validateInput(nameInputValue, passwordInputValue));
    }
  };

  return (
    <Backdrop
      onClick={handleClose}
      open={loginVisible}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <div className={styles.container}>
        {errorAlertIsVisible && (
          <Alert
            className={styles.alert}
            severity="error"
            action={
              <Button
                onClick={() => {
                  setErrorAlertIsVisible(false);
                }}
                color="inherit"
                size="small"
              >
                CLOSE
              </Button>
            }
          >
            {errorMessage}
          </Alert>
        )}
        <Typography variant="h4" gutterBottom color={"black"}>
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
            <TextField
              name="name"
              onChange={inputChangeHandler}
              id="outlined-required"
              label="Name"
              value={nameInputValue}
            />
            <TextField
              name="password"
              onChange={inputChangeHandler}
              id="outlined-password-input-required"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={passwordInputValue}
            />
          </div>
          <Button onClick={signInBtnHandler} variant="outlined">
            Sign in
          </Button>
        </Box>
      </div>
    </Backdrop>
  );
}
