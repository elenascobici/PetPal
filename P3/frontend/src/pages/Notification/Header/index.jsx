import Filters from "../Filters";
import Sort from "../Sort";

function Header({num, read, setRead}){
    // flex-column 
    return <>
        <div class="row mb-4 text-start">
            <div class="col-12 col-md-5 d-flex flex-md-row align-items-start">
                <h2 className="mb-2 mb-md-0 me-md-3 notif">Notifications</h2>
                <span class="badge noti-yellow"> {num} </span>
            </div>
            <div class="col-12 col-md-7 text-md-end mt-2 mt-md-0">
                {/* <a class="manrope link" href="user-notifications-read.css">Mark all as read</a> */}
                <div className="row">
                <div className="dropdown"> <Filters read={read} setRead={setRead}/> </div>
                
                <Sort query={read} setSearch={setRead}/>
                    {/* <div className="col-12 col-md-10">
                    <Filters read={read} setRead={setRead}/>
                    </div>
                    <div className="col-12 col-md-2">
                    <Sort query={read} setSearch={setRead}/>
                    </div> */}
                </div>
                
            </div>
        </div>
    </>;
}

export default Header;