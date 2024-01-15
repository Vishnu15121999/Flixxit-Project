import express from 'express';
import { getAllUsers, getById, login, signup , updateProfile} from '../controllers/user-controllers.js';

const router=express.Router();

router.get('/',getAllUsers);
router.post('/signup',signup)
router.post('/login',login);
router.get("/:id",getById);
router.put('/update/:id',updateProfile);

export default router;
