import mongoose from "mongoose";

const lectorSchema = mongoose.Schema({
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    esPremium: { type: Boolean, required: true},
    notasGuardadas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nota",
        required: true
    }],
    comentarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentario",
        required: true
    }]
}, { timestamps: true})

export default mongoose.model("Lector", lectorSchema)
