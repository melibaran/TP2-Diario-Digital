import express from 'express';
import dotenv from 'dotenv'


import conectarDB from './config/db.js';

dotenv.config()

const app = express()

const PORT = process.env.PORT || 4000;

conectarDB()

console.log("EL PUERTO ES: ", PORT);


app.use(express.json()) 

app.use("/", comentariosRouter)
app.use("/", notasRouter)



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})