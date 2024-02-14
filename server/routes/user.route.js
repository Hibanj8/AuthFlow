import express from "express";
import {SaveUser, login,logout,deleteUser,updateRoleUser, getAllUsers} from "../controllers/User.controller.js";
import { verifyToken } from "../middleware/tokenValidation.js";
import { isAdmin, isSuperAdmin } from "../middleware/checkPermission.js";

const router = express.Router();

router.post('/register', SaveUser);
router.post('/login', login); 
router.post('/logout', verifyToken,logout);
router.get('/getUsers', isAdmin, getAllUsers);
router.put('/:id',isAdmin, updateRoleUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
