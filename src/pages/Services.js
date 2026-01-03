import React from 'react';

const Services = () => {
  return (
    <div className="services-page">
      <div className="section">
        <div className="title">
          <h1>Our Services</h1>
        </div>
        <div className="services">
          <div className="card">
            <div className="icon">
              <i className="fas fa-calendar"></i>
            </div>
            <h2>Planning</h2>
            <p>
              Most people assume that to build a great website, your priority should be on technical aspects or being good at the design stuff. However, we disagree.
              Great websites are not built on a whim. They are planned and then built (and frequently updated).
            </p>
            <a href="https://www.bplans.com/cell-phones-retailer-business-plan/" className="Button" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fas fa-wrench"></i>
            </div>
            <h2>Renovation</h2>
            <p>
              The need for building renovation is receiving increased attention in many countries around the world. One reason for this is an ageing building stock. Another reason is the urgent need to reduce energy consumption and greenhouse gas emissions in buildings.
            </p>
            <a href="https://www.technologyreview.com/2020/03/05/905500/smartphone-innovation-in-the-third-decade-of-the-21st-century/" className="Button" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
          <div className="card">
            <div className="icon">
              <i className="fas fa-handshake"></i>
            </div>
            <h2>Support</h2>
            <p>
              telephone, an instrument designed for the simultaneous transmission of the human voice. The telephone is inexpensive, is simple to operate, and offers its users an immediate, personal type of communication that cannot be obtained through any other medium.
            </p>
            <a href="https://support.google.com/android/?hl=en" className="Button" target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

