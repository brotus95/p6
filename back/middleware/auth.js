// on appelle jsonwebtoken pour le middleware d'authentification
const jwt = require('jsonwebtoken');
require('dotenv').config();
 
// on exporte la requete
module.exports = (req, res, next) => {
   try {
        // on utilise le header authorization de la requete (CORS) on split le tableau et on récupère l'élément à l'indice 1 (Bearer Token
        const token = req.headers.authorization.split(' ')[1];
        // décoder le token en vérifiant qu'il correspond avec sa clef secrète
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        // on récupère le user id décodé par le jwt.vérify
        const userId = decodedToken.userId;
        // on rajoute l'objet userId à l'objet requete
        req.auth = {
           userId: userId
        };
    // si il y a un userId et que les id sont différants entre requete et token
    if (req.body.userId && (req.body.userId !== userId)) {
        // renvoi un message
        throw error;
        // sinon c'est que c'est bon
    } else {
        // passe au suivant
        next();
    }
   } catch(error) {
       res.status(401).json({ error });
   }
};