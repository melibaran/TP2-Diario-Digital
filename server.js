import express from 'express';
import dotenv from 'dotenv'
import comentariosRouter from './routes/comentariosRoutes.js'
import notasRouter from './routes/notasRoutes.js'
import lectoresRouter from './routes/lectoresRoutes.js'
import periodistasRouter from './routes/periodistasRouter.js'
import editoresRouter from './routes/editoresRouter.js'
import usuariosRouter from './routes/usuariosRouter.js'

import conectarDB from './config/db.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

conectarDB()

console.log("EL PUERTO ES: ", PORT);


app.use(express.json()) 

app.use("/", comentariosRouter)
app.use("/", notasRouter)
app.use("/", lectoresRouter)
app.use("/", periodistasRouter)
app.use("/", editoresRouter)
app.use("/", usuariosRouter)




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})