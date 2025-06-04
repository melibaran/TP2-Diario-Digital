import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    idNota: { type: mongoose.Schema.Types.ObjectId, ref: "Nota", required: true },
    fecha: { type: Date, required: true },
    texto: { type: String, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    denuncias: { type: String, required: false }
}, { timestamps: true });

export default mongoose.model("Comentario", comentarioSchema)