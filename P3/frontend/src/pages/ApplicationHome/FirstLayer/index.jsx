import MiniFAQ from "../MiniFAQ";
import sofaDogs from "../../../assets/images/dogs_on_sofa.jpeg"

function FirstLayer(){
    return <>
    <div class="adopt-directory">
        <div className="row">
            <h1 class="adopt-title"> Adopt a Pet Today! </h1> 
            <div class="main-info">
                <div class="right-info">
                    <div class="main-img">
                    <img class="sofa-dogs" src={sofaDogs}/>
                    </div>
                    {/* <div class="apply">
                    <a href="pet-adoption.html" class="apply-now-button"> Apply Now </a>
                    </div> */}
                </div>

                <MiniFAQ />
            </div>
        </div>
    </div>   
    </>;
}

export default FirstLayer;