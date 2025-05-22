import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    idUsuario: { type: String, required: true}, //
   idNota: { type: String, required: true}, //
    fecha: { type: Date, required: true},
    texto: { type: String, required: true},
    likes: { type: int, required: false},
    dislikes: { type: int, requried: false},
    denuncias: { type: String, required: false},
   replies: { type: Comentario, required: false}, //

}, { timestamps: true})

export default mongoose.model("Comentario", comentarioSchema)