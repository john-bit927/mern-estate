import express from 'express';
import { deleteUser, test, updateUser, getUserListings } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get
// ✅ Fix: Add missing signout route
router.get('/signout', (req, res) => {
    res.clearCookie("access_token"); // Clear JWT if stored in cookies
    return res.status(200).json({ message: "User signed out successfully" });
});

export default router;

