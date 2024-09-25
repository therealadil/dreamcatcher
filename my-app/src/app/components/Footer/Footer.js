import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // Import the GitHub icon

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-text">Made by The Mad Hackers. © 2030</p>
            <a 
                href="https://github.com/SchoolOfCode/final-project-the-mad-hackers/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-link"
            >
                <FontAwesomeIcon icon={faGithub} />
            </a>
        </footer>
    );
};

export default Footer;
