import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

import { UserContext } from "../../context/userContext";
import { LoginContext } from "../../context";

import { LoginDialog } from "../Login";
import { Notification } from "../../components/Notification";

// import gsap from "gsap";
import {
  Box,
  Grid,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ButtonBase,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import ListItemIcon from "@mui/material/ListItemIcon";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import travelMateLogoSvg from "../../resources/images/travelMateLogoSvg.svg";
import menuIcon from "../../resources/images/menuIcon.svg";
import chatIconDot from "../../resources/images/chatIconDot.svg";

const UserInfo = ({ displayName, photoURL }) => {
  return (
    <>
      <Avatar
        src={photoURL}
        sx={{ width: 32, height: 32, marginRight: "0.4rem" }}
      />
      <Typography variant={"string"} noWrap={true} maxWidth="120px">
        {displayName}
      </Typography>
    </>
  );
};

export const Nav = () => {
  //User Menu
  const [userMenu, setUserMenu] = useState(null);
  const openUserMenu = Boolean(userMenu);
  const handleClickUserMenu = (event) => setUserMenu(event.currentTarget);
  const handleCloseUserMenu = () => setUserMenu(null);
  const UserMenu = () => {
    return (
      <Menu
        anchorEl={userMenu}
        open={openUserMenu}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  };

  //Notifications
  const [notifMenu, setNotifMenu] = useState(null);
  const openNotifMenu = Boolean(notifMenu);
  const handleClickNotifMenu = (event) => {
    setNotifMenu(event.currentTarget);
    console.log(notifMenu);
  };
  const handleCloseNotifMenu = () => setNotifMenu(null);
  const NotifMenu = () => {
    return (
      <Menu
        anchorEl={notifMenu}
        open={openNotifMenu}
        onClose={handleCloseNotifMenu}
        onClick={handleCloseNotifMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
        <Notification />
      </Menu>
    );
  };

  const [drawerState, setdrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setdrawerState(open);
  };

  const [user] = useContext(UserContext);

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Home", "About", "Dashboard", "Add Request"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Profile", "Settings", "Logout"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const { userLogged, loginDialog } = useContext(LoginContext);
  const [loggedIn] = userLogged;
  const [loginDialogOpen, setLoginDialogOpen] = loginDialog;

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const LoginButton = () => {
    return (
      <>
        <Button
          onClick={() => {
            setLoginDialogOpen(true);
          }}
        >
          Login
        </Button>
      </>
    );
  };

  return (
    <>
      <Box className="navContainer">
        <Box className="navMenu" direction="row">
          <Box component={Link} to="/" width={{ xs: "8rem", lg: "10rem" }}>
            <img src={travelMateLogoSvg} alt="Travel Mate" />
          </Box>
          <Grid
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Grid container spacing={2}>
              <Grid item component={Link} to="/">
                Home
              </Grid>
              <Grid item component={Link} to="/#about">
                About
              </Grid>
              <Grid item component={Link} to="/dashboard">
                Dashboard
              </Grid>
              <Grid item component={Link} to="/addRequest">
                Add Request
              </Grid>
            </Grid>
          </Grid>
          <Stack spacing={2} direction="row" alignItems="center">
            <IconButton size="large" onClick={handleClickNotifMenu}>
              <Tooltip title={"Notifications"}>
                <NotificationsNoneRoundedIcon />
              </Tooltip>
            </IconButton>

            <NotifMenu />

            <Box
              sx={{
                height: "32px",
                width: "32px",
                cursor: "pointer",
              }}
            >
              <Tooltip title={"Chat"}>
                <ButtonBase
                  sx={{ borderRadius: "25px", height: "120%", width: "110%" }}
                >
                  <Link to="/chat">
                    <img src={chatIconDot} alt="Chat Icon" />
                  </Link>
                </ButtonBase>
              </Tooltip>
            </Box>

            <Box
              onClick={toggleDrawer(true)}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <img src={menuIcon} alt="Menu" />
            </Box>

            {loggedIn ? (
              <Box
                spacing={2}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  flexFlow: "row nowrap",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleClickUserMenu}
              >
                <UserInfo
                  displayName={user.displayName}
                  photoURL={user.photoURL}
                />
              </Box>
            ) : (
              <>
                <LoginButton />
                <LoginDialog
                  loginDialogOpen={loginDialogOpen}
                  handleLoginDialogClose={handleLoginDialogClose}
                />
              </>
            )}
          </Stack>
        </Box>
      </Box>

      <UserMenu />

      <Drawer anchor={"right"} open={drawerState} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
};
