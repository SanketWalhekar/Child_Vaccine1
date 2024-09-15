const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const childSchema = new mongoose.Schema({
  childName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  medicalHistory: { type: String, required: false },
  age: { type: Number, required: true }  // Age field added here
});

const formDataSchema = new mongoose.Schema({
  uniqueId: { type: String, default: uuidv4, unique: true },
  parentName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  houseNumber: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  childName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  medicalHistory: { type: String, required: false },
  age: { type: Number, required: true },  // Age field added here
  children: { type: [childSchema], default: [] }  // Ensure children is initialized as an empty array
});


// Hash password before saving
formDataSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const FormData = mongoose.model('FormData', formDataSchema, 'form_data');

module.exports = FormData;
