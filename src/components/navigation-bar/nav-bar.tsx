import * as React from "react";
import "./nav-bar.css";
import { Trans, useTranslation } from "react-i18next";
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
import LoginForm from "../login-form";
import { Avatar, Link, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import i18next from "i18next";

export default function MenuAppBar() {
  const { t } = useTranslation();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [lang, setLang] = React.useState(() =>
    localStorage.getItem("i18nextLng")
  );

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
    setAuth(false);
  };
  const handleLoginClick = () => {
    setAuth(!auth);
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
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
                <Button variant="contained">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Home
                  </Typography>
                </Button>
              </Link>
              <Link href={"/news"} underline="none">
                <Button variant="contained">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                  </Typography>
                </Button>
              </Link>
            </Stack>
          </Trans>
        </Toolbar>
        <Toolbar>
          <ToggleButtonGroup value={lang} exclusive aria-label="text alignment">
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
                <Avatar sx={{ bgcolor: "purple" }}>ME</Avatar>
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
              <Typography>Sign in</Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginForm />
      <Outlet />
    </Box>
  );
}
