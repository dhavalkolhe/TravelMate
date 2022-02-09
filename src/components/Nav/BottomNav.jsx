import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

//mui
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import { NotificationContext } from "../../context/notificationContext";

export const BottomNav = () => {
  const [value, setValue] = React.useState("recents");

  // eslint-disable-next-line
  const { noti, load } = useContext(NotificationContext);
  const [notificationData] = noti;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const NotifBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 1,
      top: 2,
      height: "14px",
      width: "14px",
      minWidth: "0",
      fontSize: "9px",
      lineHeight: "0px",
    },
  }));

  const ChatBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 1,
      top: 2,
      height: "6px",
      width: "6px",
      minWidth: "0",
    },
  }));

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
          icon={
            <NotifBadge badgeContent={notificationData.length} color="primary">
              <NotificationsIcon />
            </NotifBadge>
          }
          component={Link}
          to="/notifications"
        />
        {/* <BottomNavigationAction label="Add" icon={<AddCircleIcon />} /> */}
        <BottomNavigationAction
          label="Chat"
          icon={
            <ChatBadge color="secondary" variant="dot">
              <ChatBubbleIcon />
            </ChatBadge>
          }
          component={Link}
          to="/chat"
        />
        {/* <BottomNavigationAction label="Dashboard" icon={<DashboardIcon />} /> */}
      </BottomNavigation>
    </Paper>
  );
};
