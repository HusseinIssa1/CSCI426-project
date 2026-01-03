import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="heading">
        <h1>About Us</h1>
        <p>Learn more about our mission and values.</p>
      </div>
      <section className="about-us">
        <img src="images/hqdefault.jpg" alt="Mobile Store Image" />
        <div className="content">
          <h2>Welcome</h2>
          <p>
            Welcome to my mobile store, your one-stop destination for the latest and greatest in mobile technology.
            We are committed to providing our customers with cutting-edge smartphones, accessories, and exceptional
            customer service. Whether you're looking for the newest releases or expert advice, our knowledgeable team
            is here to help you stay connected and ahead of the curve. Discover the future of mobile technology with us!
          </p>
          <button className="read-more-btn">Read More</button>
        </div>
      </section>
    </div>
  );
};

export default About;

