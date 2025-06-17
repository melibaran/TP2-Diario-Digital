import jwt from 'jsonwebtoken';

export const protegerRuta = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decodificado;

        if (req.usuario.rol !== 'admin') {
            return res.status(401).json({ error: 'No eres admin' });
        }

        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};