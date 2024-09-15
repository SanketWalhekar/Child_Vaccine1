import React from 'react';
import './Recommendation.css';

const Recommendation = () => {
  return (
    <div className="recommendation">
      <h2>Vaccination Recommendations</h2>
      <p>
        Based on your child's age and vaccination history, we recommend the following vaccines:
      </p>
      <ul>
        <li>MMR (Measles, Mumps, Rubella)</li>
        <li>DTP (Diphtheria, Tetanus, Pertussis)</li>
        <li>Polio Vaccine</li>
        <li>Hepatitis B Vaccine</li>
        <li>Influenza Vaccine</li>
      </ul>
      <p>Please consult your healthcare provider for personalized recommendations.</p>

      <div className="video-section">
        <h3>Informative Video on Child Vaccination</h3>
        <div className="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/some-video-id" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="blog-section">
        <h3>Recommended Articles</h3>
        <ul>
          <li><a href="https://www.example.com/article1" target="_blank" rel="noopener noreferrer">Understanding the Importance of Vaccination</a></li>
          <li><a href="https://www.example.com/article2" target="_blank" rel="noopener noreferrer">How to Prepare Your Child for Vaccination</a></li>
          <li><a href="https://www.example.com/article3" target="_blank" rel="noopener noreferrer">Common Myths About Vaccines</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Recommendation;
