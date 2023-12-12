import express from 'express';
import session from 'express-session';
import flash from 'express-flash-messages';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js'; 
import cookieParser  from 'cookie-parser';

 dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
 // Ajouter le middleware cookie-parser
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use('/', adminRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// router.get('/some-protected-route', authenticateToken, (req, res) => {
//     // Logique de la route protégée
// });

app.listen(port, () => {
    console.log(`Le serveur est démarré : http://localhost:${port}`);
});
