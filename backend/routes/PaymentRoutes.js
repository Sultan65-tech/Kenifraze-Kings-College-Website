import express from 'express';
import { initializeDonation, verifyDonation } from "../controller/PaymentController.js";
const router = express.Router();

// POST /api/payment/donate/initialize
router.post('/donate/initialize', initializeDonation);

// GET /api/payment/donate/verify/:reference
router.get('/donate/verify/:reference', verifyDonation);

export default router;