import golden from "../../../assets/images/golden-retriever.jpeg"
import cat from "../../../assets/images/cute-cat.jpeg"
import bird from "../../../assets/images/bird.jpeg"
import { useNavigate } from "react-router-dom";

function SecondLayer(){
    const navigate = useNavigate();

    const handleClick = (type) => {
        navigate(`/${(localStorage.getItem('user_type')).toLowerCase()}/search/?type=${type}`);
    };

    return <>
        <div class="explore-more">
            <h2 class="sub-heading"> Don't know who to choose? </h2>
            <div class="pet-explore">
                <div class="row">
                    <div class="col-sm-6 col-md-6 col-lg-4 pet-opt right-align">
                        <img src={golden} class="pet-img pic-pos-up"/>
                        <div class="pet-button-container">
                          <a onClick={() => {handleClick("Dog")}} class="pet-button right-pos"> Browse Dogs &gt; </a>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-4 pet-opt left-align">
                        <img src={cat} class="pet-img pic-pos-down"/>
                        <div class="pet-button-container">
                          <a onClick={() => {handleClick("Cat")}} class="pet-button left-pos"> Browse Cats &gt; </a>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6 col-lg-4 pet-opt right-align extra-padding">
                        <img src={bird} class="pet-img pic-pos-up"/>
                        <div class="pet-button-container">
                          <a onClick={() => {handleClick("")}} class="pet-button right-pos"> Browse Others &gt; </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default SecondLayer;