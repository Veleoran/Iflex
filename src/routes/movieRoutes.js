import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUserByUsername } from '../data/userData.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/register', (req, res) => {
    res.render('register'); // Assurez-vous d'avoir un fichier register.pug
});
router.post('/register', (req, res) => {
    const { username, password, firstname, lastname } = req.body;

    createUser(username, password, firstname, lastname, (err) => {
        if (err) {
            console.error('Erreur lors de l\'inscription :', err);
            return res.status(500).send('Erreur interne du serveur');
        }
        res.redirect('/login');
    });
});
router.get('/login', (req, res) => {
    res.render('login'); // Assurez-vous d'avoir un fichier login.pug dans votre dossier views
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;

    getUserByUsername(username, (err, user) => {
        if (err || !user) {
            console.error('Erreur lors de la connexion :', err);
            return res.status(500).send('Erreur interne du serveur');
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                // Logique de session ici
                res.redirect('/dashboard');
            } else {
                res.send('Nom d’utilisateur ou mot de passe incorrect');
            }
        });
    });
});
// Ajoutez d'autres routes ici...

export default function (app) {
    app.use('/', router);
};
