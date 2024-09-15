// src/components/Register.js
import React, { useState } from 'react';
import ParentInfo from './ParentInfo';
import ChildInfo from './ChildInfo';

const Register = ({ formData, handleChange, nextStep, prevStep }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStepHandler = () => {
    if (currentStep === 2) {
      // On final step, submit the form
      console.log("Form Submitted:", formData);
    } else {
      setCurrentStep(currentStep + 1);
      nextStep();
    }
  };

  const prevStepHandler = () => {
    setCurrentStep(currentStep - 1);
    prevStep();
  };

  return (
    <div>
      {currentStep === 1 && (
        <ParentInfo
          nextStep={() => setCurrentStep(2)}
          handleChange={handleChange}
          formData={formData}
        />
      )}
      {currentStep === 2 && (
        <ChildInfo
          nextStep={nextStepHandler}
          prevStep={prevStepHandler}
          handleChange={handleChange}
          formData={formData}
        />
      )}
    </div>
  );
};

export default Register;
