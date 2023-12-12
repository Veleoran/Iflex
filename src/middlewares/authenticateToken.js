import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Extraire le token du cookie

    if (!token) return res.status(401).send('Accès refusé');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Token invalide');
        req.user = user;
        next();
    });
};
