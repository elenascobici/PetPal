
import { useEffect, useState } from "react";
import { useNavigate, useLocation, json } from "react-router-dom";

function SingleNotification({notif, change, notify}){
    // notif is one instance of Notification
    const navigate = useNavigate();
    const location = useLocation();
    const [notifData, setData] = useState({});
    // const[read, setRead] = useState();
    const [shelterInfo, setInfo] = useState({});

    //! TO DO:
    //! - Message
    //! - Scroll to Review
    //! - PetDetail

    const formatTime = (notifTime) => {
        const date = notifTime.toString().slice(0,19);
        var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ]
        var year = date.substring(0,4);
        var month= date.substring(5,7);
        var day= date.substring(8,10);
        var time= date.substring(11,19);
        // console.log(month);
        return  months[parseInt(month) - 1] + ' ' + day + ', ' + year + " at " + time;
    }

    const getNotif = () => {
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/notifications/${notif.id}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Notification data:', data);
            setData(data);
            // setRead(data.read);
        })

        .catch(error => {
            console.error('Error:', error);
        });
    };


    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const id = localStorage.getItem('id');
        // fetch(`http://localhost:8000/notifications/${notif.id}/`, {
        // method: 'GET',
        // headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        // },
        // })
        // .then(response => {
        //     return response.json();
        // })
        // .then(data => {
        //     console.log('Notification data:', data);
        //     setData(data);
        //     setRead(data.read);
        // })

        // .catch(error => {
        //     console.error('Error:', error);
        // });
        getNotif();

        fetch(`http://localhost:8000/accounts/profile/${id}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            // console.log('Shelter data:', data);
            setInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }, []);
    // useEffect(() => {
    //     getNotif();
    // }, [read]);

    // useEffect(() => {
    //     // Scroll to a specific position after navigation
    //     console.log("r u here")
    //     window.scrollTo(0, 1000);
        
    //   }, [location]);
    const readNotif = () => {
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/notifications/${notif.id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            read: false
        }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // setRead(false);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const deleteNotif = () => {
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/notifications/${notif.id}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        })
        .then(response => {
            console.log("DELETED");
            notify(change === 1 ? 0 : 1);
            // return response.json();
        })
        // .then(data => {
        //     console.log("DELETED");
        //     // setRead(false);
        // })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleNavigation = () => {
        console.log("Ok" + notifData.url);
        const shelter = localStorage.getItem('id');
        const url = notifData.url;
        const regex_review = /^\/shelter\/(\d+)\/details\/comments\/$/
        // const match = regex_review.test(url);
        // RIGHT BEFORE NAVIGATE, SET TO READ
        readNotif();
        
        if (regex_review.test(url)){
            console.log("GO HERE")
            // Shelter comment
            navigate(`/shelter/${shelter}/${shelterInfo.name}`);
        } else {
            navigate(url.toString());
        }
        
    }
    return <>
        {/* <a className="message-link"> */}
            <div className={`message-box${!notifData.read? '-read' : ''} text-start`}>
            <div className="row">
                <div className="col-10 message-link">
                <a onClick={() => handleNavigation()}>
                    <p className="no-margin"> {notif.text}</p>
                    <p class="small"> {formatTime(notif.time)}</p>
                </a>
                </div>
                <div className="col-2 close-btn">
                    <button type="button" className="btn-close" onClick={() => deleteNotif()}></button>
                </div>
            </div>
            </div>
        {/* </a> */}
    </>;
}

export default SingleNotification;