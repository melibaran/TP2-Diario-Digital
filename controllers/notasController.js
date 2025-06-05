import Nota from "../models/Nota.js"


export const CrearNota = async (req, res) => {  

    const { fecha, idPeriodista, titulo, categoria, resumen, imagenes , texto} = req.body;
    if(!fecha || !idPeriodista || !titulo || !categoria 
        || !resumen || !imagenes || !texto){
        return res.status(400).json({error: "Faltan datos"})
    }

    const nota = {
        fecha,
        idPeriodista,
        titulo,
        categoria,
        resumen,
        imagenes,
        texto
    }

    try {
        const nuevaNota = await Nota.create(nota)
        res.status(201).json(nuevaNota)
    } catch (error) {
        res.status(500).json({error: "Error al crear la nota. Detalles del error: " + error})
    }
    
}

export const getNotas = async (req, res) => {
    try {
        const notas = await Nota.find().populate("comentarios")
        res.json(notas)
    } catch (error) {
        res.status(500).json({error: "Error al obtener notas. Detalles del error: " + error})
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
        res.status(500).json({ error: "ID de nota invalido. Detalles del error: " + error})
    }

}

