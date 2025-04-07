import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import './InitialPage.css';

const InitialPage = () => {
  return (
    <>
      <NavbarComponent />
      <div className="banner-container">
        <img 
          src="https://www.teamly.com/blog/wp-content/uploads/2022/08/Schedule-a-Release-Sprint.png" 
          alt="Company Banner" 
          className="banner-image"
        />
      </div>
      
      <FooterComponent />
    </>
  );
};

export default InitialPage;