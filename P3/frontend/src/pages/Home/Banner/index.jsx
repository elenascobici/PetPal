import { Link } from "react-router-dom"
import bannerImage from "../../../assets/images/main.png"
import bannerImage2 from "../../../assets/images/main2.png"

const Banner = ({ bannerText1, bannerText2, buttonText }) => {
  let buttonStyles = {};
  if (buttonText === 'View applications') {
    // Update styles for 'View applications' button
    buttonStyles = {
      ...buttonStyles,
      fontSize: '22px',
      padding: '9px 10px',
    };
  }
    return (
        <div className="container-fluid" id="mainImgContainerHome">
        <img className="img-fluid" id="mainImg" alt="Responsive image" src={bannerImage} />
        <img className="img-fluid" id="mainImg2" alt="Responsive image" src={bannerImage2} />
        <div className="d-flex flex-column col-md-6 col-sm-12 col-xs-12 justify-content-center align-middle" id="overlay">
          <h1 className="overlayPetpal">{ bannerText1 }</h1>
          <h1 className="overlayPetpal">{ bannerText2 }</h1>
          <div id="applyToday">
            <Link className="yellowButton" id="apply" style={buttonStyles} to="/application/home/">{ buttonText }</Link>
          </div>
        </div>        
      </div>
    )
}

export default Banner;