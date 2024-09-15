import React from 'react';

const ViewRecords = ({ vaccines }) => {
  return (
    <div className="container">
      <h2>Vaccine Records</h2>
      {vaccines.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {vaccines.map((vaccine) => (
            <li key={vaccine.id}>
              <strong>{vaccine.name}</strong> - {vaccine.date}
            </li>
          ))}
        </ul>
      )}
      <div className="image-container">
        <img src="/vaccine3.jpg" alt="View Records" />
      </div>
    </div>
  );
};

export default ViewRecords;
