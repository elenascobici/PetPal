import "../style.css"
// import Calcifer from "../../../assets/images/calcifer.jpg";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function PetInfo({petID}){

  const [pet_data, setPetData] = useState({});
  const navigate = useNavigate();
  const [profilePath, setProfilePath] = useState("");

  // const [pet_info, setPetInfo] = useState({
  //   name: '',
  //   description: 'This pet has no description',
  // });

  const moreDetails = () => {
    navigate(`/pets/${petID}`);
  }

  useEffect(() => {
    // Fetch profile picture.
    if (pet_data.pet_image_1) {
        setProfilePath("https://petpal-production.up.railway.app/pet/pet-image/" + pet_data.pet_image_1.split('/').pop());
    }

  }, [pet_data])

  useEffect(() => {
    // console.log("do u go in here?")
    const token = localStorage.getItem('access_token');
    fetch(`https://petpal-production.up.railway.app/pet/${petID}/?search=`, {
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
          console.log('Pet data:', data);
          // console.log("NAME:" + data[0].name);
          setPetData(data[0]);
          // setPetInfo({name: data.name, description: data.description});
      })
      .catch(error => {
          console.error('Error:', error);
      }); 
  }, []);
  
    return <>
        <div className="row mb-3">
            <div className="col-12 col-md-5 col-lg-4 ml-1">
                <img src={profilePath} className="pet-pfp img-fluid"/>
            </div>
            <div className="summarized-info col-12 col-md-8 col-lg-7 text-start">
            {pet_data && (<>
              <p className="heading3"> {pet_data.name} </p>
              <p className="desc"> {pet_data.description !== "" ? pet_data.description : "This pet has no description"} </p>
              <a onClick={moreDetails} className="t-button"> More details &gt; </a>
            </>)}
            </div>  
        </div>
    </>;
}

export default PetInfo;