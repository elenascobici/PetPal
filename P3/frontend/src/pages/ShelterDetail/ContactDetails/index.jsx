import { Link } from "react-router-dom";

const ContactDetails = ({ phone, email, location, image }) => {
     return (
        <div className="container" id="contact">
          <img id="shelterLogo3" src={image}/>
          <div className="contact-grid" id="contactGrid">
            <div className="subtitleHeader gridItem"><div className="contact-subtitle">Contact Details:</div></div> 
            <div className="shelterImg"><img id="shelterLogo" src={image}/></div>
            <div className="phoneIcon gridItem"><i className="bi bi-telephone-fill icon"></i></div>
                <div className="phoneLabel gridItem"><div className="shelterContactInfoLabel">Phone:</div></div>
            {phone ? (
                <div className="phone gridItem"><div className="textInfo">{phone}</div>
                </div>
            ) : (
                <></>
            )}
            <div className="emailIcon gridItem"><i className="bi bi-envelope-fill icon"></i></div>
            <div className="emailLabel gridItem"><div className="shelterContactInfoLabel">Email:</div></div>
            {email ? (
                <Link className="email gridItem" to={`mailto:${email}`}>
                    <div className="textInfo">{email}</div>
                </Link>
            ) : (
                <></>
            )}
            <div className="locationIcon gridItem"><i className="bi bi-geo-alt-fill icon"></i></div>
                <div className="locationLabel gridItem"><div className="shelterContactInfoLabel">Location:</div></div> 
            {location ? (
                <div className="location gridItem"><div className="textInfo">{location}</div></div>
            ) : (
                <></>
            )}
            
          </div>
          <img id="shelterLogo2" src={image} />
        </div>
    )
}

export default ContactDetails;