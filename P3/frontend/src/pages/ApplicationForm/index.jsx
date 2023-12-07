
import Form from "./Form";
import './style.css';
import catImg from '../../assets/images/bg-adoption.jpg';
// 1. Create a React Component
function ApplicationForm(){
    // 2. Figure out what you want to handle (do this in the form html)
    // - Validation and changing CSS
    // - When submit is clicked, send an ajax req.
    // - navigate to the list page with a message on the top (can be clicked out so maybe an element in list and if shown then onclick x remove and hide?)
    

    return <>
       <div class="image-wrapper">
            <img class="responsive-image" src={catImg} alt="cat for adoption"/>
       </div>

       <div class="main-pet-adoption manrope">
            <div class="container mt-5">
                <h2 class="text-start mb-4 mt-4 title">General Pet Adoption Application</h2>
                <h4 class="text-start mb-4">Adopter's Details</h4>
               <Form />
            </div>
       </div>
     </>;
}

export default ApplicationForm;