import mongoose from "mongoose";

const periodistaSchema = mongoose.Schema({
   idUsuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
   categorias: {type: [String], required: true}
}, { timestamps: true})

export default mongoose.model("Periodista", periodistaSchema)
