import jwt  from 'jsonwebtoken';
import Cookies from "cookies";

export default (req, res, next) => {
    // Récupération du token dans le cookie
    let token = new Cookies(req,res).get('token');
    // Si le cookie (jwt) n'existe pas
    if (token == null) return res.sendStatus(401);

    // sinon on vérifie le jwt
    jwt.verify(token, process.env.JWT_SECRET, (err, dataJwt) => { 
        // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
        if(err) return res.sendStatus(403);
        
        req.user = dataJwt.username;
    });
    next();
}