import express from 'express';
import { createListing, deleteListing, updateListing } from '../controllers/listing.controller.js'; // ✅ Fixed import
import { verifyToken } from '../utils/verifyUser.js'; // ✅ Ensure .js

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing); // ✅ Added this line


export default router; // ✅ Added missing export
