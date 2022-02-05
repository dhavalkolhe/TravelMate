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
import LoadingButton from "@mui/lab/LoadingButton";
// import CloseIcon from "@mui/icons-material/Close";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import ListItemIcon from "@mui/material/ListItemIcon";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import travelMateLogoSvg from "../../resources/images/travelMateLogoSvg.svg";
import menuIcon from "../../resources/images/menuIcon.svg";
import chatIconDot from "../../resources/images/chatIconDot.svg";
import chatIconBlank from "../../resources/images/chatIconBlank.svg";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import "../../firebase/firebase";
import { getAuth, signOut } from "firebase/auth";

import Toast from "../Toast/Toast";
import { toast } from "react-toastify";

const notify = (type, message) => {
  toast[type](message);
};

const auth = getAuth();

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
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={logOut}>
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

  const [user, setUser] = useContext(UserContext);

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={"home"}>
          <Link to={`/`}>
            <ListItemText primary={"Home"} />
          </Link>
        </ListItem>
        <ListItem button key={"about"}>
          <Link to={`/#about`}>
            <ListItemText primary={"About"} />
          </Link>
        </ListItem>
        <ListItem button key={"dashboard"}>
          <Link to={`/dashboard`}>
            <ListItemText primary={"Dashboard"} />
          </Link>
        </ListItem>
        <ListItem button key={"addRequest"}>
          <Link to={`/addRequest`}>
            <ListItemText primary={"Add Request"} />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"logout"} onClick={logOut}>
          <ListItemText primary={"Logout"} />
        </ListItem>
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
    const [loginLoading, setloginLoading] = useState(false);

    useEffect(() => {
      if (loginDialogOpen) {
        setloginLoading(true);
      }
    }, [loginDialogOpen]);

    return (
      <>
        <LoadingButton
          onClick={() => {
            setloginLoading(true);
            setTimeout(() => setLoginDialogOpen(true), 800);
          }}
          variant="text"
          startIcon={<LoginRoundedIcon />}
          loading={loginLoading}
          loadingPosition="start"
          color="primary"
          // sx={{ color: "theme.palette.theme.text" }}
        >
          Login
        </LoadingButton>
      </>
    );
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({
          authorized: false,
          displayName: "",
          photoURL: "",
        });
      })
      .catch((error) => {
        notify("error", "Error signing out user");
        console.log(error.message);
      });
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
            {user.authorized && (
              <>
                <IconButton
                  size="medium"
                  onClick={handleClickNotifMenu}
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                >
                  <Tooltip title={"Notifications"}>
                    <NotificationsNoneRoundedIcon />
                  </Tooltip>
                </IconButton>

                <NotifMenu />

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                  }}
                  // sx={{
                  //   // height: "32px",
                  //   // width: "32px",
                  //   cursor: "pointer",
                  // }}
                >
                  {/* <ButtonBase
                    sx={{
                      borderRadius: "25px",
                      height: "120%",
                      width: "110%",
                    }}
                  > */}
                  <Tooltip title={"Chat"}>
                    <Link to="/chat">
                      {/* <img src={chatIconBlank} alt="Chat" /> */}
                      <IconButton size="medium">
                        <ChatBubbleOutlineOutlinedIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  {/* </ButtonBase> */}
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
              </>
            )}

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
