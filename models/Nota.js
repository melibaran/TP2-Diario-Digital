import mongoose from "mongoose";

const notaSchema = mongoose.Schema({
    fecha: { type: Date, required: true},
    idPeriodista: { type: mongoose.Schema.Types.ObjectId, ref: "Periodista", required: true},
    titulo: { type: String, required: true},
    categoria: { type: String, required: true},
    resumen: { type: String, required: true},
    imagenes: { type: String, required: false}, //
    texto: { type: String, required: true},
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comentario" }]

}, { timestamps: true})

export default mongoose.model("Nota", notaSchema)
