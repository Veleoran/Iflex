import express from 'express';
import { login, getLogin  } from '../controllers/AuthController.js';
import { adminController } from '../controllers/AdminController.js';
const router = express.Router();

// Ici, ajoutez vos routes pour le dashboard
router.get('/dashboard', (req, res) => {
    // Logique pour afficher le dashboard
    res.render('dashboard');
});

export default router;
