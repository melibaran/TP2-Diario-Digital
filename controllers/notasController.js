import Nota from "../models/Nota.js"


export const CrearNota = async (req, res) => {  

    const { fecha, idPeriodista, titulo, categoria, resumen, imagenes , texto, comentarios} = req.body;
    if(!fecha || !idPeriodista || !titulo || !categoria 
        || !resumen || !imagenes || !texto || !comentarios){
        return res.status(400).json({error: "Faltan datos"})
    }

    const nota = {
        fecha,
        idPeriodista,
        titulo,
        categoria,
        resumen,
        imagenes,
        texto, 
        comentarios,
    }

    try {
        const nuevaNota = await Nota.create(nota)
        res.status(201).json(nuevaNota)
    } catch (error) {
        res.status(500).json({error: "Error al crear la nota"})
    }
    
}

export const getNotas = async (req, res) => {
    try {
        const notas = await Nota.find()
        res.json(notas)
    } catch (error) {
        res.status(500).json({error: "Error al obtener notas"})
    }
}

export const getNotasById = async (req, res) => {

    try {
        const nota = await Nota.findById(req.params.id)
        if(nota){
            res.json(nota)
        }else{
            res.status(404).json({ error: 'Nota no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID de nota invalido"})
    }

}

