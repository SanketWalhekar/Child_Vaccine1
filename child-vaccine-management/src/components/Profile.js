import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newChild, setNewChild] = useState({
    childName: "",
    dateOfBirth: "",
    gender: "male",
    medicalHistory: "",
    age: "",
  });
  const [addingChild, setAddingChild] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching user data for ID:", userId);

        const response = await fetch(
          `http://localhost:8080/api/profile/${userId}`
        );
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleChildInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setNewChild({ ...newChild, dateOfBirth: value, age });
    } else {
      setNewChild({ ...newChild, [name]: value });
    }
  };

  const handleAddChildClick = () => {
    setAddingChild(true);
  };

  const handleAddChildSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8080/api/profile/${userId}/addChild`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChild),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add child');
      }
  
      const newChildData = await response.json(); // Assuming the API returns the added child's data
  
      // Check if `children` exists and append new child
      setUserData((prevUserData) => ({
        ...prevUserData,
        children: prevUserData.children
          ? [...prevUserData.children, newChildData] // Append new child to existing array
          : [newChildData], // Create array if no children exist
      }));
  
      // Reset the form
      setNewChild({ childName: '', dateOfBirth: '', gender: 'male', medicalHistory: '', age: '' });
      setAddingChild(false);
      setSuccessMessage('Child added successfully!');
  
      // Hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Add child error:', error);
      setError('An error occurred while adding the child');
    }
  };
  
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {userData ? (
        <div className="profile-details">
          <p>
            <strong>Parent Name:</strong> {userData.parentName}
          </p>
          <p>
            <strong>Contact Number:</strong> {userData.contactNumber}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Address:</strong> {userData.houseNumber}, {userData.street},{" "}
            {userData.city}, {userData.state}, {userData.postalCode},{" "}
            {userData.country}
          </p>
          <div className="child-details">
            <h3>Child 1</h3>
            <p>
              <strong>Child Name:</strong> {userData.childName}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(userData.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Gender:</strong> {userData.gender}
            </p>
            <p>
              <strong>Age:</strong> {userData.age}
            </p>
            <p>
              <strong>Medical History:</strong> {userData.medicalHistory}
            </p>
          </div>

          {userData.children && userData.children.length > 0 ? (
            userData.children.map((child, index) => (
              <div key={index} className="child-details">
                <h3>Child {index + 2}</h3>
                <p>
                  <strong>Child Name:</strong> {child.childName}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(child.dateOfBirth).toLocaleDateString()}
                </p>
                <p>
                  <strong>Gender:</strong> {child.gender}
                </p>
                <p>
                  <strong>Age:</strong> {child.age}
                </p>
                <p>
                  <strong>Medical History:</strong> {child.medicalHistory}
                </p>
              </div>
            ))
          ) : (
            <p>No children added yet.</p>
          )}

          <button onClick={handleAddChildClick}>Add Child</button>

          {addingChild && (
            <form className="add-child-form" onSubmit={handleAddChildSubmit}>
              <h3>Add New Child</h3>
              <label>
                Child Name:
                <input
                  type="text"
                  name="childName"
                  value={newChild.childName}
                  onChange={handleChildInputChange}
                  required
                />
              </label>
              <label>
                Date of Birth:
                <input
                  type="date"
                  name="dateOfBirth"
                  value={newChild.dateOfBirth}
                  onChange={handleChildInputChange}
                  required
                />
              </label>
              <label>
                Age:
                <input type="text" name="age" value={newChild.age} readOnly />
              </label>
              <label>
                Gender:
                <select
                  name="gender"
                  value={newChild.gender}
                  onChange={handleChildInputChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Medical History:
                <textarea
                  name="medicalHistory"
                  value={newChild.medicalHistory}
                  onChange={handleChildInputChange}
                />
              </label>
              <button type="submit">Add Child</button>
              <button type="button" onClick={() => setAddingChild(false)}>
                Cancel
              </button>
            </form>
          )}

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      ) : (
        <div>No user data available.</div>
      )}
    </div>
  );
};

export default Profile;
