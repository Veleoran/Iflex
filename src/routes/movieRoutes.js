import express from 'express';
import bcrypt from 'bcrypt';
import { getUserByUsername } from '../data/userData.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            // Logique de session ici
            res.redirect('/dashboard');
        } else {
            res.send('Nom d’utilisateur ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).send('Erreur interne du serveur');
    }
});

// Ajoutez d'autres routes ici...

export default function (app) {
    app.use('/', router);
};
