const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const secureDataSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    password: { type: String, required: true }
  });

// Hash password before saving
secureDataSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const SecureData = mongoose.model('SecureData', secureDataSchema, 'secure_data');

module.exports = SecureData;
//comment