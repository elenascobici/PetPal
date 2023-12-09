import { useEffect, useState } from "react";
import SingleNotification from "../SingleNotification";


function NotificationList({notifications,change, notify}){
    
    return <>
        {notifications.map((notification) => (
                <SingleNotification notif={notification} key={notification.id} change={change} notify={notify}/>
        ))}
    </>;
}

export default NotificationList;