import FilterDropdown from "../FilterDropdown";
import SortDropdown from "../SortDropdown";

function Filters({setParam, query}){
    return <>
        <div className="row mb-3">
            <div className="col-12 col-md-5 col-lg-5">
                <FilterDropdown setParam={setParam} query={query}/>
            </div>
            <div className="col-12 col-md-1 col-lg-1"><br></br></div>
            <div className="col-12 col-md-5 col-lg-5">
                <SortDropdown setParam={setParam} query={query}/>
            </div>
        </div>
        <br/>

    </>;
}

export default Filters;