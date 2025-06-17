import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import comentariosRouter from './routes/comentariosRoutes.js'
import notasRouter from './routes/notasRoutes.js'
import lectoresRouter from './routes/lectoresRoutes.js'
import periodistasRoutes from './routes/periodistasRoutes.js'
import editoresRoutes from './routes/editoresRoutes.js'
import usuariosRouter from './routes/usuariosRouter.js'
import logInRouter from './routes/logInRoutes.js'

import conectarDB from './config/db.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

conectarDB()

console.log("EL PUERTO ES: ", PORT);

// Middlewares globales
app.use(express.json());
app.use(cookieParser());


app.use("/", comentariosRouter)
app.use("/", notasRouter)
app.use("/", lectoresRouter)
app.use("/", periodistasRoutes)
app.use("/", editoresRoutes)
app.use("/", usuariosRouter)
app.use("/", logInRouter)

// Middleware 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})