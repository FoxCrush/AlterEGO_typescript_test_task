import React from "react";
import styles from "./login-form.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { Button, Backdrop, Typography, Alert } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { toggleVisible, setToken, setActiveTab } from "../../redux/user-slice";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../../services/validation";

const userToken = 333222444;

export default function FormPropsTextFields() {
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const passwordInputRef = React.useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      setErrorAlertIsVisible(false);
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
  const passwordEnterBtnHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      signInBtnHandler();
    }
  };
  const signInBtnHandler = () => {
    if (nameInputValue.length > 0 && passwordInputValue.length > 0) {
      if (!validateInput(nameInputValue, passwordInputValue)) {
        setErrorMessage(t("incorrectPassword")!);
        setErrorAlertIsVisible(true);
      } else {
        setNameInputValue("");
        setPasswordInputValue("");
        setErrorMessage("");
        setErrorAlertIsVisible(false);
        dispatch(toggleVisible());
        dispatch(setToken(userToken));
        navigate("profile", { replace: true });
        dispatch(setActiveTab("profile"));
      }
    } else {
      setErrorMessage(t("loginAndPasswordReq")!);
      setErrorAlertIsVisible(true);
    }
  };
  const btnPressHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };
  React.useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [loginVisible]);

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
                {t("close")}
              </Button>
            }
          >
            {errorMessage}
          </Alert>
        )}
        <Typography variant="h5" gutterBottom color={"black"}>
          {t("auth,please")}
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
              inputRef={nameInputRef}
              onKeyDown={btnPressHandler}
              name="name"
              onChange={inputChangeHandler}
              id="outlined-required"
              label={t("name")}
              value={nameInputValue}
            />
            <TextField
              inputRef={passwordInputRef}
              onKeyDown={passwordEnterBtnHandler}
              name="password"
              onChange={inputChangeHandler}
              id="outlined-password-input-required"
              label={t("password")}
              type="password"
              autoComplete="current-password"
              value={passwordInputValue}
            />
          </div>
          <Button onClick={signInBtnHandler} variant="outlined">
            {t("logIn")}
          </Button>
        </Box>
      </div>
    </Backdrop>
  );
}
