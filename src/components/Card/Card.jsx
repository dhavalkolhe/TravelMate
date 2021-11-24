import React, { useState } from 'react'
import userIcon from '../../img/user.svg';
import currentLocationIcon from '../../img/currentLocationIcon.svg'
import destinationLocationIcon from '../../img/destinationLocationIcon.svg'
import dateIcon from '../../img/dateIcon.svg'
import arrow from '../../img/arrow.svg'
import './Card.css'

function Card({ currentCity, destinationCity, date, description, displayName, photoURL }) {
    const [descHide, setDescHide] = useState(true);
    return (
        <div className="card__container">
            <div className="user__name">
                <i className="user__icon">
                    <img src={photoURL ? photoURL : userIcon} alt="user-icon" />
                </i>
                <span >{displayName ? displayName : "User Name"}</span>
            </div>
            <div className="user__data">
                <div>
                    <i className="card__icon">
                        <img src={currentLocationIcon} alt="currentLocationIcon" />
                    </i>
                    <span>
                        {currentCity.length > 20 ? currentCity.slice(0, 20) + "..." : currentCity}
                    </span>
                </div>
                <div>
                    <i className="card__icon">
                        <img src={destinationLocationIcon} alt="destinationLocationIcon" />
                    </i>
                    <span>
                        {destinationCity.length > 20 ? destinationCity.slice(0, 20) + "..." : destinationCity}
                    </span>
                </div>
                <div>
                    <i className="card__icon">
                        <img src={dateIcon} alt="dateIcon" />
                    </i>
                    <span>
                        {date}
                    </span>
                </div>
            </div>
            <button className="desc__btn"
                onClick={() => { setDescHide(!descHide) }}>
                Description
                <i className="arrow__icon">
                    <img src={arrow} alt="arrow" />
                </i>
            </button>
            <p className={descHide ? "desc__none" : "desc__display"}>
                {description}
            </p>
            <div className="send__container">
                <button className="send-btn blue__btn">
                    Send Request
                </button>
            </div>
        </div >
    )
}

export default Card
