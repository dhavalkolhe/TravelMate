import React, { useEffect, useState, useContext } from 'react'
import { NotificationContext } from '../../context/notificationContext';
import Loader from '../../components/Loader/Loader';
import NotificationCard from './NotificationCard';

function Notification() {
    const { noti, load } = useContext(NotificationContext);
    const [notificationData] = noti;
    const [loading] = load;

    const [cardData, setCardData] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    // const [loading, setLoading] = useState(true);


    useEffect(() => {
        // console.log(notificationData);
        if (notificationData.length) {
            const pendingReq = notificationData.filter((notification) =>
                (notification.status === 'pending')
            );

            const x = pendingReq.map((notification, i) => {
                return (
                    <NotificationCard
                        key={i}
                        currentCity={notification.currentCity}
                        destinationCity={notification.destinationCity}
                        displayName={notification.displayName}
                        photoURL={notification.photoURL}
                        reqId={notification.reqId}
                    />
                )
            })

            setCardData(x);
            setNotificationCount(x.length);
        }
    }, [notificationData])

    // useEffect(() => {
    //     if (cardData.length) {
    //         setLoading(false);
    //     }
    // }, [cardData])

    return (
        <div>
            Notifications: {notificationCount}
            {loading ? <Loader /> : (
                <div>
                    {notificationCount ? cardData : <p>No Notifications!</p>}
                </div>
            )}
            {/* {loading && <Loader />} */}
        </div>
    )
}

export default Notification;