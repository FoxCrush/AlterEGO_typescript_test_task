import * as React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const handleLogoutClick = () => {
    setAuth(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
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
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Link to={"/"}>
              <Button>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Home
                </Typography>
              </Button>
            </Link>
            <Link to={"/news"}>
              <Button>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  News
                </Typography>
              </Button>
            </Link>
          </ButtonGroup>
        </Toolbar>
        <Toolbar>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              EN
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              UA
            </ToggleButton>
          </ToggleButtonGroup>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ bgcolor: "purple" }}>OP</Avatar>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
