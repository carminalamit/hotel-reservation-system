import { FaPhone, FaFacebook, FaInstagram, FaTwitter, FaLocationArrow } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="row">
        <div className="col-md-3 col-sm-6" style={{marginRight: '150px'}}>
          <h6 className="foot-column">About us</h6>
          <p className="fontS">
            The Richmonde Hotel & Suites operate prestigious luxury and each room is
            uniquely designed to embrace the relevant local culture, style and
            history. We set our sights high and our standards higher, aiming
            always to delight our customers and bring luxurious comfort and
            impeccable service.
          </p>
        </div>
        <div className="col-md-3 col-sm-6">
          <h6 className="foot-column">Contact us</h6>
          <ul className="list-unstyled">
            <li><FaPhone /> +6355765</li>
            <li>
              <a target={"_blank"} href="https://www.facebook.com/profile.php?id=100090639450573" style={{ color: "white", textDecoration: "none" }}>
              <FaFacebook /> Facebook
              </a>
            </li>
            <li>
              <a target={"_blank"} href="https://www.instagram.com/" style={{ color: "white", textDecoration: "none" }}>
              <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a target={"_blank"} href="https://twitter.com/" style={{ color: "white", textDecoration: "none" }}>
              <FaTwitter /> Twitter
            </a>
            </li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-6" style={{marginRight: '150px'}}>
          <h6 className="foot-column">Location</h6>
          <p className="fontS">
          70 Washington Square South<br></br>New York 10012<br></br> United States
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
