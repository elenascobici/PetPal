import "../style.css"
// import Calcifer from "../../../assets/images/calcifer.jpg";
import React, { useState, useEffect } from 'react';

function PetInfo({petID}){

  const [pet_data, setPetData] = useState({});
  // const [pet_info, setPetInfo] = useState({
  //   name: '',
  //   description: 'This pet has no description',
  // });

  const moreDetails = () => {
    //! REDIRECT TO PET PAGE
    console.log(pet_data.name);
  }

  useEffect(() => {
    console.log("do u go in here?")
    fetch(`http://localhost:8090/pet/${petID}/`, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMTQ3MDI0LCJpYXQiOjE3MDIwNjA2MjQsImp0aSI6ImY0Mzg0MTI3MzQ0NTQ2NmQ4ZmZlNDhkMmUzYjU5M2M1IiwidXNlcl9pZCI6MywidXNlcl90eXBlIjoiU2Vla2VyIiwiaWQiOjN9.7n60oLI1_ltlgxO9oYDeSJ5aM95jyecGlOcyUf7-XK8',
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
            <div className="col-12 col-md-5 col-lg-5 ml-1">
                <img src= {decodeURIComponent("http://localhost:8090/media/pets/placeholder.png")} className="pet-pfp img-fluid"/>
            </div>
            <div className="summarized-info col-12 col-md-7 col-lg-7 text-start">
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