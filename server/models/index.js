import mongoose from 'mongoose';
import { User, Role } from './Schemas.models.js';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const db = {};

db.mongoose = mongoose;
db.User = User; 
db.Role = Role;
db.secretKey = process.env.DB_SECRET_KEY; 
db.url = process.env.DB_CONNECTION_STRING;
db.bcrypt = bcrypt;
db.Joi = Joi;
db.jwt = jwt;

// Exporting
export default db;
