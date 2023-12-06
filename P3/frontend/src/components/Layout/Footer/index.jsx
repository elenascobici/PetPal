const Footer = () => {
    return (
        <footer class="text-center">
      <div class="container-fluid">
        <div class="row gx-0" id="footer">
          <div class="footerContact col">
            <div id="connect">Connect with Us!
              <p id="connectPetPal">PetPal</p>
            </div>
          </div>
          <div class="col-1" id="verticalLineBox">
            <div id="verticalLine"></div>
          </div>
          <div id="contactInfo" class="col">
            <a id="link" href="mailto:petpal23@gmail.com">petpal23@gmail.com</a>        	
            <p id="telephone">(987) 654 - 3210</p>
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item" id="insta">
                <a href="#" role="button">
                  <i class="bi bi-instagram"></i>
                </a>
              </li>
              <li class="list-group-item" id="x">
                <a href="#" role="button">
                  <i class="bi bi-twitter-x"></i>
                </a>
              </li>
              <li class="list-group-item" id="fb">
                <a href="#" role="button">
                  <i class="bi bi-facebook"></i>
                </a>
              </li>
            </ul>
          </div> 
        </div>
        <div class="row">
          <div class="copyright">&copy; Copyright 2023</div>
      </div>
    </div>
    </footer>
    )
}

export default Footer;