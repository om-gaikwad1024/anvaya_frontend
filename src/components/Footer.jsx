import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-column">
          <h3 className="footer-title">Anvaya</h3>
          <p>
          A world where you can wander through a lush, virtual garden, exploring the secrets of Ayurveda, Yoga, Unani, Siddha, and Homeopathy.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <a href="/home" className="footer-link">
            Home
          </a>
          <a href="/aboutus" className="footer-link">
            About Us
          </a>
          <a href="/explore" className="footer-link">
            Explore
          </a>
          <a href="/contactus" className="footer-link">
            Contact Us
          </a>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h3 className="footer-title">Follow Us</h3>
          <div className="footer-social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
      </div>

      <div>
        <p className="footer-copyright">
          © 2024 The Stoics. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
