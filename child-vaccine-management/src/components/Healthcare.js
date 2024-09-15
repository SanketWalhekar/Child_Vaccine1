import React from 'react';
import './Healthcare.css';

const Healthcare = () => {
  const openParentChatbot = () => {
    window.open('https://chatgpt.com/', '_blank');
  };

  const openExpertChatbot = () => {
    window.open('https://chatgpt.com/', '_blank');
  };

  return (
    <div className="healthcare">
      <h2>Healthcare Section</h2>

      <div className="chatbot-section">
        <h3>Parent Queries Chatbot</h3>
        <button className="chatbot-button" onClick={openParentChatbot}>
          Open Parent Queries Chatbot
        </button>
      </div>

      <div className="chatbot-section">
        <h3>Expert Doctor Advice Chatbot</h3>
        <button className="chatbot-button" onClick={openExpertChatbot}>
          Open Expert Doctor Advice Chatbot
        </button>
      </div>
    </div>
  );
};

export default Healthcare;
