import express from 'express';
import {isAdmin} from "../middleware/checkPermission.js";
import {verifyToken} from "../middleware/tokenValidation.js"
import { getRole, PostRole } from '../controllers/Role.controller.js';


const router = express.Router();

router.get('/getRoles', verifyToken,isAdmin, getRole);
router.post('/rolePost', verifyToken, isAdmin, PostRole);

export default router;
