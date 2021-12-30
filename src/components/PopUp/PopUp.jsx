import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Zoom from "@mui/material/Zoom";
import Loader from "../../components/Loader/Loader";
import userIcon from "../../img/user.svg";
import currentLocationIcon from "../../img/currentLocationIcon.svg";
import destinationLocationIcon from "../../img/destinationLocationIcon.svg";
import dateIcon from "../../img/dateIcon.svg";

import "./PopUp.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Zoom
      direction="up"
      ref={ref}
      style={{ transitionDelay: "300ms" }}
      {...props}
    />
  );
});

const PopUp = ({
  open,
  setOpen,
  currentCity,
  destinationCity,
  date,
  description,
  displayName,
  photoURL,
  userId,
  sendText,
  disable,
  gender,
  nop,
  sendRequest,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpen(false);
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <img src={photoURL ? photoURL : userIcon} alt="user-icon" />
        <span>{displayName ? displayName : "User Name"}</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <img src={currentLocationIcon} alt="currentLocationIcon" />
          <span>
            {currentCity.length > 20
              ? currentCity.slice(0, 20) + "..."
              : currentCity}
          </span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          <img src={destinationLocationIcon} alt="destinationLocationIcon" />
          <span>
            {destinationCity.length > 20
              ? destinationCity.slice(0, 20) + "..."
              : destinationCity}
          </span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          <img src={dateIcon} alt="dateIcon" />
          <span>{date}</span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          <p>Preffered Gender</p>
          <span>{gender}</span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          <p>No. of Passengers</p>
          <span>{nop}</span>
        </DialogContentText>
        <DialogContentText id="alert-dialog-slide-description">
          <p>Description</p>
          <span>{description ? description : "No description available"}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="send__container">
          <button
            className="send-btn blue__btn"
            disabled={disable}
            onClick={sendRequest}
          >
            {sendText}
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
