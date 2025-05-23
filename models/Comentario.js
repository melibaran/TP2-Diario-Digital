import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    idUsuario: { type: String, required: true},
    idNota: { type: String, required: true},
    fecha: { type: Date, required: true},
    texto: { type: String, required: true},
    likes: { type: Number, required: false},
    dislikes: { type: Number, requried: false},
    denuncias: { type: String, required: false}

}, { timestamps: true})

export default mongoose.model("Comentario", comentarioSchema)