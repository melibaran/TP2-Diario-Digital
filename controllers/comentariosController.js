import Comentario from "../models/Comentario.js"

export const CrearComentario = async (req, res) => { 

    const { idUsuario, idNota, fecha, texto } = req.body;
    if(!idUsuario || !idNota || !fecha || !texto){
        return res.status(400).json({error: "Faltan datos para crear el comentario"})
    }
    
    const comentario = {
        idUsuario, 
        idNota, 
        fecha, 
        texto, 
        likes : 0, 
        dislikes: 0, 
        denuncias: 0}

    try {
        const nuevoComentario = await Comentario.create(comentario)
        res.status(201).json(nuevoComentario)
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
