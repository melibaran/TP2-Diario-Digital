import mongoose from "mongoose";

const editorSchema = mongoose.Schema({
    idUsuario: { type: String, required: true}, //
   notas: { type: Array, required: true}, 

}, { timestamps: true})

export default mongoose.model("Editor", editorSchema)