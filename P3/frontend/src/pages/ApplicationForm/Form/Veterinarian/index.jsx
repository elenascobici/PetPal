import Name from "../Name";
import Phone from "../Phone";
import '../../style.css';

function Veterinarian({valid, validCheck, tofill, fill}){
    return <>
        <h4 className="text-start mb-4">Veterinarian Details</h4>
        <Name required="false" value= {valid} check={validCheck} tofill={tofill} fill={fill}/>
        <Phone required="false" value= {valid} check={validCheck} tofill={tofill} fill={fill}/>
    </>
}

export default Veterinarian;