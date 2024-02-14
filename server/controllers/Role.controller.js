import db from '../models/index.js';

export const getRole = async (req, res) => {
  try {
    const roles = await db.Role.find();
    res.status(200).send(roles);
  } catch (err) {
    console.error(`Error getting role: ${err}`);
    res.status(500).send(err);
  }
};

export const PostRole = async (req, res) => {
  try {
    const { name } = req.body;

    const existingRole = await db.Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ error: 'Role with this name already exists' });
    }

    const newRole = new db.Role({ 
      name,
    });

    await newRole.save();

    res.status(201).json(newRole);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
};
