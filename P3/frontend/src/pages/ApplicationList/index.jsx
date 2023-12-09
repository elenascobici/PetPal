import PetCard from "./PetCard";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PetApplications from "./PetApplications";
import Filters from "./Filters";
import React from 'react';
import sadDog from "../../assets/images/cute_sad_dog.png"

function ApplicationList(){
    const navigate = useNavigate();
    //! if have time show username if seeker

    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPages, setTotalPages] = useState(1);
    const [pets, setPets ] = useState([]);
    const [numTotal, setTotal] = useState(0);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        setUserType(localStorage.getItem('user_type'));
    }, []);

    const query = useMemo(() => ({
        page: parseInt(searchParams.get("page") ?? 1),
        status: searchParams.get("status") ?? '',
        type: searchParams.get("type") ?? '',
    }), [searchParams]);

    const fetchData = () => {
        const param = new URLSearchParams(query);
        const token = localStorage.getItem('access_token');
        fetch(`http://localhost:8000/application/list/?${param}`, {
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
            console.log('Application data:', data);
            setPets(data.results);
                setTotalPages(Math.ceil(data.count / 8));
            
            setTotal(data.count);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, [query]);

    return <>
        <div class="main-user-applications">
            <h2 id="title-app">Application Overview</h2>
            <Filters setParam={setSearchParams} query={query}/>
  
            <PetApplications listings={pets} totalPets={numTotal}/>

            <div class="col-12">
                <p>
                { query.page < totalPages
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page + 1})}>Next</button>
                : <></> }
                
                { query.page > 1 
                ? <button className="page-btn" onClick={() => setSearchParams({...query, page: query.page - 1})}>Previous</button>
                : <></> }
                </p>
                {totalPages === 0 && (<div> <p className="no-apps"> No Applications found </p> <img className="sadDog" src={sadDog}></img>
                {userType === "Seeker" && (<div class="col-12">
                    <a class="appButton" onClick={() => navigate("/search/")}> Explore More Pets! </a>
                </div>)}
                </div>)}
                {totalPages !== 0 && <p>Page {query.page} out of {totalPages}</p>}
            </div>
        </div>

    </>;
}

export default ApplicationList;