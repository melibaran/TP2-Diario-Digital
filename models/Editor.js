import mongoose from "mongoose";

const editorSchema = mongoose.Schema({
   idUsuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
   notas: [{type: mongoose.Schema.Types.ObjectId, ref: "Nota"}]

}, { timestamps: true})

export default mongoose.model("Editor", editorSchema)