import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

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
  IconButton,
  ButtonBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";

import travelMateLogoSvg from "../../resources/images/travelMateLogoSvg.svg";
import menuIcon from "../../resources/images/menuIcon.svg";
import chatIconDot from "../../resources/images/chatIconDot.svg";

const UserInfo = ({ username }) => {
  return (
    <>
      <Avatar sx={{ width: 32, height: 32, marginRight: "0.4rem" }} />
      {username}
    </>
  );
};

export const Nav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              <Grid item component={Link} to="/add">
                Add Request
              </Grid>
            </Grid>
          </Grid>

          <Stack spacing={2} direction="row" alignItems="center">
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
                  <img src={chatIconDot} alt="Chat Icon" />
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
              onClick={handleClick}
            >
              <UserInfo username={"User Name"} />
            </Box>
          </Stack>
        </Box>
      </Box>

      <Drawer anchor={"right"} open={drawerState} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
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
    </>
  );
};
