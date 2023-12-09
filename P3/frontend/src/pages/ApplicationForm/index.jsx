
import Form from "./Form";
import './style.css';
import catImg from '../../assets/images/bg-adoption.jpg';
// 1. Create a React Component
function ApplicationForm(){
    // 2. Figure out what you want to handle (do this in the form html)
    // - Validation and changing CSS
    // - When submit is clicked, send an ajax req.
    // - navigate to the list page with a message on the top (can be clicked out so maybe an element in list and if shown then onclick x remove and hide?)
    //! RETRIEVE PET ID SOMEHOW

    return <>
       <div className="image-wrapper">
            <img className="responsive-image" src={catImg} alt="cat for adoption"/>
       </div>

       <div className="main-pet-adoption manrope">
            <div className="container mt-5">
                <h2 className="text-start mb-4 mt-4 title">General Pet Adoption Application</h2>
                <h4 className="text-start mb-4">Adopter's Details</h4>
               <Form petID={4}/>
            </div>
       </div>
     </>;
}

export default ApplicationForm;