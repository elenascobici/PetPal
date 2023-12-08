import TextArea from "../TextArea";
import Fence from "./Fence";
import '../../style.css';

function PetDetails({tofill, fill}){
    return <>
        <TextArea info = {{label: "Currently Owned Pets", placeholder: "List the names, ages and types of the pets currently in your household."}} 
        required='false' valid = {{}} validCheck={() => {}} tofill={tofill} fill={fill} fieldName="owned_pets" />
        <TextArea info = {{label: "Pet Behavior", placeßholder: "Describe the behavior of the other pets currently in your household."}} 
        required='false' valid = {{}} validCheck={() => {}} tofill={tofill} fill={fill} fieldName="other_pet_behavior"/>
        <Fence tofill={tofill} fill={fill}/>
    </>
}

export default PetDetails;