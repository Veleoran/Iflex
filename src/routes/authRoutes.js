import express from 'express';
import { login, getLogin  } from '../controllers/AuthController.js';
import { adminController } from '../controllers/AdminController.js';
import controlJwt from '../services/jwtService.js'; 
const router = express.Router();

router.get('/login', getLogin); // Affiche le formulaire de connexion
router.post('/login', login);   // Traite la soumission du formulaire de connexion

router.use('/admin', controlJwt); // Protéger toutes les routes /admin
router.get('/admin', adminController); // Route pour la page d'administration

export default router;
