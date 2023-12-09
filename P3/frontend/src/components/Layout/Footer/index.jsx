const Footer = () => {
    return (
        <footer className="text-center">
      <div className="container-fluid">
        <div className="row gx-0" id="footer">
          <div className="footerContact col">
            <div id="connect">Connect with Us!
              <p id="connectPetPal">PetPal</p>
            </div>
          </div>
          <div className="col-1" id="verticalLineBox">
            <div id="verticalLine"></div>
          </div>
          <div id="contactInfo" className="col">
            <a id="link" href="mailto:petpal23@gmail.com">petpal23@gmail.com</a>        	
            <p id="telephone">(987) 654 - 3210</p>
            <ul className="list-group list-group-horizontal">
              <li className="list-group-item" id="insta">
                <a href="#" role="button">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="list-group-item" id="x">
                <a href="#" role="button">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </li>
              <li className="list-group-item" id="fb">
                <a href="#" role="button">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
            </ul>
          </div> 
        </div>
        <div className="row">
          <div className="copyright">&copy; Copyright 2023</div>
      </div>
    </div>
    </footer>
    )
}

export default Footer;