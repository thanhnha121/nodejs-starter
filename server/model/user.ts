import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  project: String,
  name: String,
  facebook_id: String,
  sender_id: String,
  fanpageID: String,
  avatar: String,
  cover: String,
  email: String,
  time: Date,
  attributes: Object
}, { collection: 'user' });

const User = mongoose.model('user', userSchema);
export default User;

