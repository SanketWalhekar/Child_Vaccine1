import React from 'react';
import './Home.css';
import vaccineImage1 from '../images/vaccine1.jpg';
import vaccineImage2 from '../images/vaccine2.jpg';
import vaccineImage3 from '../images/vaccine3.jpg';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Child Vaccine Management</h1>
        <p>Your trusted platform for managing your child's vaccination schedule</p>
      </header>

      <section className="home-section">
        <h2>Why Vaccination is Important</h2>
        <div className="home-content">
          <p>
            Vaccinations protect children from serious illnesses and complications of vaccine-preventable diseases. 
            Immunization is a key component of primary health care and an indisputable human right. 
            It’s also one of the best health investments money can buy. 
            Vaccines are a critical tool in the battle against diseases.
          </p>
          <img src={vaccineImage1} alt="Vaccination" />
        </div>
      </section>

      <section className="home-section">
        <h2>Benefits of Vaccination</h2>
        <div className="home-content">
          <ul>
            <li>Prevents the spread of contagious, dangerous, and deadly diseases.</li>
            <li>Protects individuals and communities by reducing the prevalence of disease.</li>
            <li>Ensures children can grow up healthy and thrive.</li>
          </ul>
          <img src={vaccineImage2} alt="Child receiving vaccine" />
        </div>
      </section>

      <section className="hogit remote set-url originme-section">
        <h2>Our Mission</h2>
        <div className="home-content">
          <p>
            Our mission is to provide a comprehensive and user-friendly platform to help parents keep track of their child's 
            vaccination schedule, book appointments, and get reliable information about vaccines and their importance.
          </p>
          <img src={vaccineImage3} alt="Health care professional" />
        </div>
      </section>

      <footer className="home-footer">
        <p>Stay informed, stay healthy. Join us in our mission to protect our children.</p>
      </footer>
    </div>
  );
};

export default Home;
// AIzaSyDM3yZ9-EF6aOYtfWZ2veZPrm8rB887aMk