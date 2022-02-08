import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

//mui
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

export const BottomNav = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: {
          md: "none",
        },
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Notifications"
          icon={<NotificationsIcon />}
          component={Link}
          to="/notifications"
        />
        {/* <BottomNavigationAction label="Add" icon={<AddCircleIcon />} /> */}
        <BottomNavigationAction
          label="Chat"
          icon={<ChatBubbleIcon />}
          component={Link}
          to="/chat"
        />
        {/* <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} /> */}
      </BottomNavigation>
    </Paper>
  );
};
