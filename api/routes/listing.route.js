import express from 'express';
import { createListing } from '../controllers/listing.controller.js'; // ✅ Fixed import
import { verifyToken } from '../utils/verifyUser.js'; // ✅ Ensure .js

const router = express.Router();

router.post('/create', verifyToken, createListing);

export default router; // ✅ Added missing export
