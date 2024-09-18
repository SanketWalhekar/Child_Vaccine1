const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const FormData = require('./models/FormData');
const SecureData = require('./models/SecureData');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 8080;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/child_vaccine_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors());

// API endpoint to handle form data submission
app.post('/api/register', async (req, res) => {
  try {
    const { parentName, contactNumber, email, houseNumber, street, city, state, postalCode, country, password } = req.body;

    // Save the parent data in FormData collection
    const formData = new FormData({
      parentName,
      contactNumber,
      email,
      houseNumber,
      street,
      city,
      state,
      postalCode,
      country,
    });
    await formData.save();

    // Save the login credentials in SecureData collection
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const secureData = new SecureData({
      uniqueId: formData.uniqueId,
      contactNumber: contactNumber,
      password: hashedPassword,
    });
    await secureData.save();

    res.status(200).json({ message: 'Registration successful!', uniqueId: formData.uniqueId });
  } catch (error) {
    console.error('Error saving registration data:', error);
    res.status(500).json({ message: 'Error saving registration data', error: error.message });
  }
});


// API endpoint for login
// API endpoint for login
// Import bcrypt

// API endpoint for login
app.post('/api/login', async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await SecureData.findOne({ contactNumber: mobile });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the plaintext password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', uniqueId: user.uniqueId });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// API endpoint to get user profile
app.get('/api/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user data from FormData collection
    const user = await FormData.findOne({ uniqueId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new child to an existing user
app.post('/api/profile/:userId/addChild', async (req, res) => {
  const { userId } = req.params;
  const { childName, dateOfBirth, gender, medicalHistory, age } = req.body;

  try {
    const user = await FormData.findOne({ uniqueId: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newChild = {
      childName,
      dateOfBirth,
      gender,
      medicalHistory,
      age  // Age is now included in the child object
    };

    user.children.push(newChild);
    await user.save();

    res.status(200).json({ message: 'Child added successfully', user });
  } catch (error) {
    console.error('Error adding child:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
