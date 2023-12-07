import TextArea from "../TextArea";
import Fence from "./Fence";
import '../../style.css';

function PetDetails(){
    return <>
        <TextArea info = {{label: "Currently Owned Pets", placeholder: "List the names, ages and types of the pets currently in your household."}} required='false' />
        <TextArea info = {{label: "Pet Behavior", placeholder: "Describe the behavior of the other pets currently in your household."}} required='false'/>
        <Fence />
    </>
}

export default PetDetails;