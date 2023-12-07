import Name from "../Name";
import Phone from "../Phone";
import '../../style.css';

function Veterinarian(){
    return <>
        <h4 class="text-start mb-4">Veterinarian Details</h4>
        <Name required="false"/>
        <Phone required="false"/>
    </>
}

export default Veterinarian;