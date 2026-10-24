import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="divide-footer" id="quick-links">
          <strong>Quick links</strong>
          <p>
            About Us <i className="bi bi-send quick-send"></i>
          </p>
          <p>
            Contact Us <i className="bi bi-send quick-send"></i>
          </p>
        </div>
        <div className="divide-footer" id="resources">
          <strong>Resources</strong>
          <p>
            Privacy Policy <i className="bi bi-send quick-send"></i>
          </p>
          <p>
            Blogs <i className="bi bi-send quick-send"></i>
          </p>
        </div>
        <div className="divide-footer connect-us">
          <p>
            <strong>Stay Connected</strong>
          </p>
          <div className="social-icons">
            <i className="bi bi-instagram" aria-label="Instagram"></i>
            <i className="bi bi-facebook" aria-label="Facebook"></i>
            <i className="bi bi-twitter-x" aria-label="Twitter X"></i>
            <i className="bi bi-linkedin" aria-label="LinkedIn"></i>
          </div>
        </div>
      </footer>
      <hr />

      <div className="copyright">
        <small>Copyright &copy; {new Date().getFullYear()} Orgetise, All rights reserved</small>
        <small>India</small>
      </div>
    </>
  );
}
