import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js'; // ✅ Fixed import
import { verifyToken } from '../utils/verifyUser.js'; // ✅ Ensure .js

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);

export default router; // ✅ Added missing export
