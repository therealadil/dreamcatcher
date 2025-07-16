import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">TheRealAdil // MadHackers © 2026</p>
        <a
          href="https://github.com/SchoolOfCode/final-project-the-mad-hackers/"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;