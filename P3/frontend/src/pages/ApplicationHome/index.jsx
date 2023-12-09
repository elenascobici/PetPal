import FirstLayer from "./FirstLayer";
import SecondLayer from "./SecondLayer";
import "./style.css"

function ApplicationHome(){
    return <>
        <div className="main-home-app">
                <FirstLayer />
                <SecondLayer />
        </div>

    </>;
}

export default ApplicationHome;