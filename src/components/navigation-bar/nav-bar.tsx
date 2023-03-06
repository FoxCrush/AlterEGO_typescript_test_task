import * as React from "react";
import "./nav-bar.css";
import { Trans, useTranslation } from "react-i18next";
import i18next from "i18next";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LoginForm from "../login-form";
import { Avatar, Link, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { toggleVisible, setToken } from "../../redux/user-slice";

export default function MenuAppBar() {
  const { t } = useTranslation();
  const [disabledBtn, setDisabledBtn] = React.useState(
    window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
  );
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [lang, setLang] = React.useState(() =>
    localStorage.getItem("i18nextLng")
  );
  const token = useAppSelector((state) => state.users.token);
  const dispatch = useAppDispatch();
  const handleLangs = (
    event: React.MouseEvent<HTMLElement>,
    newLngs: string
  ) => {
    if (newLngs.length > 0) {
      setLang(newLngs);
      i18next.changeLanguage(newLngs);
    }
  };
  const handleLogoutClick = () => {
    dispatch(setToken(0));
    setAuth(false);
  };
  const handleLoginClick = () => {
    dispatch(toggleVisible());
    setAnchorEl(null);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (token !== 0) {
      setAuth(true);
    }
  }, [token]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Toolbar>
          <Trans i18nKey={"navButtons"}>
            <Stack spacing={2} direction="row">
              <Link href={"/"} underline="none">
                <Button
                  variant="contained"
                  onClick={() => {
                    setDisabledBtn("");
                  }}
                  disabled={disabledBtn.length === 0}
                >
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Home
                  </Typography>
                </Button>
              </Link>
              <Link href={"/news"} underline="none">
                <Button
                  variant="contained"
                  onClick={() => {
                    setDisabledBtn("news");
                  }}
                  disabled={disabledBtn.includes("news")}
                >
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                  </Typography>
                </Button>
              </Link>
            </Stack>
          </Trans>
        </Toolbar>
        <Toolbar>
          <Trans i18nKey={"langOptions"}>
            <ToggleButtonGroup
              value={lang}
              exclusive
              aria-label="text alignment"
            >
              <ToggleButton
                value="en"
                aria-label="left aligned"
                onClick={handleLangs}
              >
                EN
              </ToggleButton>
              <ToggleButton
                value="ua"
                aria-label="centered"
                onClick={handleLangs}
              >
                UA
              </ToggleButton>
            </ToggleButtonGroup>
          </Trans>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ bgcolor: "purple" }}>{t("me")}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link href={"/profile"} underline="none">
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      setDisabledBtn("profile");
                    }}
                  >
                    {t("profile")}
                  </MenuItem>
                </Link>
                <Link href={"/"} underline="none">
                  <MenuItem onClick={handleLogoutClick}>{t("logOut")}</MenuItem>
                </Link>
              </Menu>
            </div>
          ) : (
            <Button size="large" onClick={handleLoginClick} color="inherit">
              <Typography>{t("logIn")}</Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginForm />
      <Outlet />
    </Box>
  );
}
