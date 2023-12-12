import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../data/Database.js'; // Assurez-vous que le chemin est correct
import { selectByUsername } from "../repository/User.js";

export function getLogin(req, res) {
    res.render('login'); // Assurez-vous que 'login' est le nom de votre template PUG pour le formulaire de connexion
}

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await pool.promise().query('SELECT * FROM user WHERE username = ?', [username]);
        const user = results[0];
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            req.flash('error', 'Authentification échouée');
            return res.redirect('/auth/connexion');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        req.flash('notify', 'Connexion réussie');
        res.redirect('/');
    } catch (error) {
        req.flash('error', 'Erreur interne du serveur');
        res.redirect('/auth/connexion');
    }
};