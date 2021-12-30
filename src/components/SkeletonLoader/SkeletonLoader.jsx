import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkeletonLoader({ skeletonCount }) {
  let body = [];
  for (let i = 0; i < skeletonCount; i++) {
    body.push(
      <div className="card__container ">
        <div className="user__name">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={140} style={{ marginLeft: 22 }} />
        </div>
        <div>
          <Skeleton variant="text" width={180} style={{ marginTop: 15 }} />
          <Skeleton variant="text" width={180} style={{ marginTop: 10 }} />
          <Skeleton variant="text" width={180} style={{ marginTop: 10 }} />
          <Skeleton variant="text" width={100} style={{ marginTop: 10 }} />
        </div>
        <div>
          <Skeleton
            variant="text"
            width={100}
            height={40}
            style={{ marginLeft: 110 }}
          />
        </div>
      </div>
    );
  }

  return <div className="results">{body}</div>;
}

{
  /* <div className="card__container">
      <div className="user__name">
        <i className="user__icon">
          <img src={photoURL ? photoURL : userIcon} alt="user-icon" />
        </i>
        <span>{displayName ? displayName : "User Name"}</span>
      </div>
      <div className="user__data">
        <div>
          <i className="card__icon">
            <img src={currentLocationIcon} alt="currentLocationIcon" />
          </i>
          <span>
            {currentCity.length > 20
              ? currentCity.slice(0, 20) + "..."
              : currentCity}
          </span>
        </div>
        <div>
          <i className="card__icon">
            <img src={destinationLocationIcon} alt="destinationLocationIcon" />
          </i>
          <span>
            {destinationCity.length > 20
              ? destinationCity.slice(0, 20) + "..."
              : destinationCity}
          </span>
        </div>
        <div>
          <i className="card__icon">
            <img src={dateIcon} alt="dateIcon" />
          </i>
          <span>{date}</span>
        </div>
      </div> */
}
