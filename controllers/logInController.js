import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario  from "../models/Usuario.js";

// Función para generar accessToken
export const generarAccessToken = (usuario) => {
    return jwt.sign(
        { id: usuario._id, email: usuario.email, rol: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Función para generar refreshToken
export const generarRefreshToken = (usuario) => {
    const datosEncriptados = { id: usuario._id, email: usuario.email, rol: 'admin' }
    return jwt.sign(
        datosEncriptados,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan credenciales' });
    }

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            console.log(password, " ", usuario.password);
            
            return res.status(401).json({ error: 'Password incorrecta' });
        }

        const accessToken = generarAccessToken(usuario);
        const refreshToken = generarRefreshToken(usuario);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Error al hacer login' });
    }
};

// Refresh token
export const refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ error: 'No hay refresh token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const nuevoAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email, rol: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        res.json({ accessToken: nuevoAccessToken });
    } catch (error) {
        return res.status(403).json({ error: 'Refresh token inválido' });
    }
};

// Logout
export const logout = (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
    });
    res.json({ mensaje: 'Sesión cerrada correctamente' });
};