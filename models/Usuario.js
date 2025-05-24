import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    nombreYApellido: { type: String, required: true},
    password: { type: String, required: true},
    fechaAlta: { type: Date, required: true},
    estaActivo: { type: Boolean, required: true},

}, { timestamps: true})

export default mongoose.model("Usuario", usuarioSchema)