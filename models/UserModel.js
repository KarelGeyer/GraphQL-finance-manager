import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
  },
  currency: {
    type: String,
    required: true,
  },
  accountID: {
    type: String,
    required: true,
  },
  teamID: {
    type: String,
  },
  refreshToken: String,
});

export default mongoose.model('User', UserModel);