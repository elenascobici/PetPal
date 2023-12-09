import "./style.css"
import Header from "./Header";
import NotificationList from "./NotificationList";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function Notification(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [notifications, setData] = useState([]);
    const [numNotifs, setNum] = useState(0);
    const [change, notifyChange] = useState(0);

    const query = useMemo(() => ({
        page: parseInt(searchParams.get("page") ?? 1),
        filter: searchParams.get("filter") ?? "",
        sort: searchParams.get("sort") ?? ''
    }), [searchParams]);

    const pageRender = () => {
        const param = new URLSearchParams(query);
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/notifications/list/?${param}`, {
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
            // console.log('Notification data:', data);
            setData(data.results);
            setNum(data.count);
            setTotalPages(Math.ceil(data.count / 10));

        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


    useEffect(() => {
        pageRender();
    }, [query]);

    useEffect(() => {
        pageRender();
    }, [change]);

    return <>
    <div class="main-notif bg-lightYellow manrope">
        <div class="main-notifications manrope">
            <div class="container mt-5 notification-box">
                <Header num={numNotifs} read={query} setRead={setSearchParams}/>
                <NotificationList notifications={notifications} change={change} notify={notifyChange}/>

                {numNotifs === 0 && <p className="no-notif"> No notifications to see here!</p>}

            <div class="col-12">
                <p>
                { query.page < totalPages
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page + 1})}>Next</button>
                : <></> }
                
                { query.page > 1 
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page - 1})}>Previous</button>
                : <></> }
                </p>
                {totalPages !== 0 && <p>Page {query.page} out of {totalPages}</p>}
            </div>
            </div>
        </div>
    </div>

    </>;
}

export default Notification;