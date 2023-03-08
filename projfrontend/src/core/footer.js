import React from "react";

const Footer = () => (
  <div style={{ paddingTop: "120px" }}>
    <footer className="footer pb-2">
      <div className="container p-4">
        <div className="row">
          <div className="col p-0">
            <h6 className="footer-menu-header">Rentvio</h6>
            <p className="footer-menu-item pt-3 mb-2">About Us</p>
            <p className="footer-menu-item mb-2">Culture</p>
            <p className="footer-menu-item mb-2">Careers</p>
            <p className="footer-menu-item mb-2">News</p>
            <p className="footer-menu-item mb-2">Contact</p>
          </div>
          <div className="col p-0">
            <h6 className="footer-menu-header">Resources</h6>
            <p className="footer-menu-item pt-3 mb-2">Blog</p>
            <p className="footer-menu-item mb-2">Events</p>
            <p className="footer-menu-item mb-2">Support </p>
            <p className="footer-menu-item mb-2">Help Center</p>
          </div>
          <div className="col p-0">
            <h6 className="footer-menu-header">Social</h6>
            <p className="footer-menu-item pt-3 mb-2">Twitter</p>
            <p className="footer-menu-item mb-2">LinkedIn</p>
            <p className="footer-menu-item mb-2">Facebook </p>
            <p className="footer-menu-item mb-2">Github</p>
            <p className="footer-menu-item mb-2">Dribbble</p>
          </div>
          <div className="col p-0">
            <h6 className="footer-menu-header">Legal</h6>
            <p className="footer-menu-item pt-3 mb-2">Terms</p>
            <p className="footer-menu-item mb-2">Privacy</p>
            <p className="footer-menu-item mb-2">Cookies </p>
            <p className="footer-menu-item mb-2">Licenses</p>
          </div>
        </div>
        <div className="row" style={{paddingTop: "2rem", paddingLeft: 0}}>
          <hr className="footer-hr-break"></hr>
          <div id="copyright-section" className="p-0 d-flex justify-content-between">
            <h6 className="pt-4 footer-menu-header">
              <i className="fa fa-copyright"></i>
              <span> 2023. Rentvio Y.L. Pvt. Ltd.</span>
            </h6>

            <div className="pt-4 mb-2 d-flex justify-content-between" style={{width: '160px'}}>
              <i className="socials fa fa-twitter"></i>
              <i className="socials fa fa-linkedin"></i>
              <i className="socials fa fa-facebook"></i>
              <i className="socials fa fa-github"></i>
              <i className="socials fa fa-dribbble"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
