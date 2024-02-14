import db from '../models/index.js';
import { createToken } from "../middleware/tokenCreation.js";

const querySchema = db.Joi.object({
  username: db.Joi.string().required().min(2),
  email: db.Joi.string().email().required(),
  password: db.Joi.string().required().min(6),
  gender: db.Joi.string(),
});

export const SaveUser = async (req, res) => {
  try {
    const { error } = querySchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const user = new db.User({
      username: req.body.username,
      email: req.body.email,
      password: db.bcrypt.hashSync(req.body.password, 10),
      gender: req.body.gender,
      roles: req.roles,
    }); 
      
    const findUser = await db.User.findOne({ email: user.email });
    if (findUser) {
      return res.status(409).send('User already exists');
    }
    const savedUser = await user.save();
    res.status(201).send("User Created");

  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ email }).populate('roles');

    if (!password || !email) {
      return res.status(400).send("email or Password is not valid ");
    }
    if (!user) {
      return res.status(401).json({ message: "Email or Password is not correct" });
    }

    const passwordIsValid = await db.bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json("Email or Password is not correct ");
    }
    
    const token = createToken(user);
    res.cookie('access_token',  token);
    return res.status(200).json({ token, id: user._id, role: user.roles.name });
  } catch (error) {
    console.error("Error during authentication:", error.message);
  }
};

export const logout = async(req, res) => {
  res.clearCookie('token').send('Logout successful');
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.find().populate('roles');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateRoleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const targetRole = await db.Role.findOne({ name });
    console.log(name);
    if (!targetRole) {
      return res.status(404).json({ error: 'Role not found' });
    }
    
    const updatedUser = await db.User.findByIdAndUpdate(
      id,
      { roles: targetRole._id },
      { new: true }
    ).populate('roles');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await db.User.findOneAndDelete(
      { _id: req.params.id}
    );
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
