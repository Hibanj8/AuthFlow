import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: '65c7c6c947df6fdd2cf6be4f'
  },
});

const User = mongoose.model('User', userSchema);

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
  }
});

const Role = mongoose.model('Role', roleSchema);

export { User, Role };
