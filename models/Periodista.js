import mongoose from "mongoose";

const periodistaSchema = mongoose.Schema({
    idUsuario: { type: String, required: true},
    categorias: { type: Array, required: true},
}, { timestamps: true})

export default mongoose.model("Periodista", periodistaSchema)
