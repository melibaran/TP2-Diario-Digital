import mongoose from "mongoose";

const notaSchema = mongoose.Schema({
    fecha: { type: Date, required: true},
   idPeriodista: { type: String, required: true}, //
    titulo: { type: String, required: true},
    categoria: { type: String, required: true},
    resumen: { type: String, required: true},
   imagenes: { type: String, required: true}, //
    texto: { type: String, required: true},
    comentarios: { type: Array, required: true},

}, { timestamps: true})

export default mongoose.model("Nota", notaSchema)
