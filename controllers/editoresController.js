import Editor from "../models/Editor.js";

export const CrearEditor = async (req, res) => { 

    const { idUsuario, notas} = req.body;
    if(!idUsuario || !notas){
        return res.status(400).json({error: "Faltan datos para crear el editor"})
    }
    
    const editor = {
        idUsuario, 
        notas, 
        }

    try {
        const nuevoEditor = await Editor.create(editor)
        res.status(201).json(nuevoEditor)
    } catch (error) {
        res.status(500).json({error: "Error al crear el nuevo editor"})
    }
    
}


export const getEditores = async (req, res) => {
    const {storeLocation} = req.query;

    try {
        const editor = await Editor.find({
            storeLocation: {$regex: storeLocation, $options: 'B'}
        })
        res.json(editor)
    } catch (error) {
        res.status(500).json({error: "Error al obtener editores"})
    }
}


export const getEditoresById = async (req, res) => {

    try {
        const editor = await Editor.findById(req.params.id)
        if(editor){
            res.json(editor)
        }else{
            res.status(404).json({ error: 'Editor no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID de editor invalido"})
    }

}


