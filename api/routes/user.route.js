import express from 'express';


const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'A router is working!' });
});

export default router;