import Comentario from "../models/Comentario.js"
import Nota from "../models/Nota.js"

export const CrearComentario = async (req, res) => { 

    const { idUsuario, idNota, fecha, texto } = req.body;
    //VER: const { id: idNota } = req.params;
    const { usuario } = req;


    if(!idUsuario || !idNota || !fecha || !texto){
        return res.status(400).json({error: "Faltan datos para crear el comentario"})
    }

    try {
    const nota = await Nota.findById(postId);
    if (!nota) {
        return res.status(404).json({ error: "Nota no encontrada" });
    }

    const comentario = ({
        userId: usuario.id,
        nota: idNota, 
        fecha, 
        texto, 
        likes : 0, 
        dislikes: 0, 
        denuncias: 0
    });

    res.status(201).json(comentario)
    } catch (error) {
        res.status(500).json({error: "Error al crear el nuevo comentario. Error: " + error})
    }
}


export const getComentarios = async (req, res) => {
    const {storeLocation} = req.query;

    try {
        const comentario = await Comentario.find()
        res.json(comentario)
    } catch (error) {
        res.status(500).json({error: "Error al obtener comentarios. Detalles del error: " + error})
    }
}

export const getComentariosById = async (req, res) => {

    try {
        const comentario = await Comentario.findById(req.params.id)
        if(comentario){
            res.json(comentario)
        }else{
            res.status(404).json({ error: 'Comentario no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID de comentario invalido. Detalles de error: " + error})
    }

}


// Listar comentarios de una nota
export const listarComentarios = async (req, res) => {
    const { id: notaId } = req.params;

    try {
        const comentarios = await Comentario.find({ nota: notaId })
            .populate('userId', 'nombre email') 
            .sort({ createdAt: -1 });

        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener comentarios", errorMsg: error.message });
    }
};