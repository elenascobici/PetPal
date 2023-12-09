import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "./shelters.css";
import SheltersMain from "../../assets/images/shelters-main.jpg";
import ShelterResults from "./ShelterResults";
import ShelterRow from "./ShelterRow";

const SheltersSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [shelters, setShelters ] = useState([]);
    const [numTotal, setTotal] = useState(0);

    const query = useMemo(() => ({
        page: parseInt(searchParams.get("page") ?? 1),
    }), [searchParams]);

    const fetchData = () => {
        const param = new URLSearchParams(query);
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/accounts/shelter-list/?${param}`, {
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
            console.log('results:', data.results);
            setShelters(data.results);
            setTotalPages(Math.ceil(data.count / 3));
            setTotal(data.count);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, [query]);

    return (
        <div class="page-container">
            <div class="main px-6 pt-5">
            <div class="container-fluid" id="mainImgContainer">
                <img class="img-fluid" id="mainImg" alt="Responsive image" src={SheltersMain}/>
            </div>
            <div id="title">Meet our shelter organizations</div>
            <form class="formInputs" id="search" method="get">
                <div class="form-row d-flex justify-content-center" id="searchBar">
                <div class="form-group col d-flex justify-content-center align-center">
                    <input class="form-control" type="search" placeholder="Search for shelters..."/>
                    <a class="btn border-0 position-absolute" id="searchButton" type="submit" href="shelters-search.html#search">
                    <i class="bi bi-search" id="searchIcon"></i>
                    </a>
                </div>
                </div>
            </form>
            
            <form class="formInputs" id="searchSmall" method="get">
                <div class="form-row d-flex justify-content-center" id="searchBar">
                <div class="form-group col d-flex justify-content-center align-center">
                    <input class="form-control" type="search" placeholder="Search"/>
                    <button class="btn border-0 position-absolute" id="searchButton" type="submit">
                    <i class="bi bi-search" id="searchIcon"></i>
                    </button>
                </div>
                </div>
            </form>
            <div class="container" id="shelterList1">
                <div class="grid grid-shelter">
                        <div class="grid-header tableHeader">
                        Organization
                        </div>
                        <div class="grid-header tableHeader">
                        Location
                        </div>
                        <div class="grid-header tableHeader">
                        Contact
                        </div>
                        
                        {shelters.map((shelter, index) => (
                            <ShelterRow shelter={shelter} key={shelter.name+index}/>
                        ))}
                        
                </div>
            </div>
            <div class="col-12">
                <p>
                { query.page < totalPages
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page + 1})}>Next</button>
                : <></> }
                
                { query.page > 1 
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page - 1})}>Previous</button>
                : <></> }
                </p>
                {totalPages !== 0 && <p className="page-indicator">Page {query.page} out of {totalPages}</p>}
            </div>           
        </div>
        </div>
    )
}

export default SheltersSearch;