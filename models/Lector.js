import mongoose from "mongoose";

const lectorSchema = mongoose.Schema({
    idUsuario: { type: Boolean, required: true},
    esPremium: { type: Boolean, required: true},
   notasGuardadas: { type: Array, required: true},
    comentarios: { type: Array, required: true},
}, { timestamps: true})

export default mongoose.model("Lector", lectorSchema)
