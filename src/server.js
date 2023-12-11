import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));



const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your-secret-here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

movieRoutes(app); 

app.listen(port, () => {
    console.log(`Le serveur est démarré : http://localhost:${port}`);
});
