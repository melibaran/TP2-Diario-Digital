import Lector from "../models/Lector.js"

export const CrearLector = async (req, res) => { 

    const { esPremium, notasGuardadas, comentarios } = req.body;
    if(!esPremium || !notasGuardadas || !comentarios){
        return res.status(400).json({error: "Faltan datos para crear el lector"})
    }
    
    const lector = {
        esPremium, 
        notasGuardadas, 
        comentarios}

    try {
        const nuevoLector = await Lector.create(lector)
        res.status(201).json(nuevoLector)
    } catch (error) {
        res.status(500).json({error: "Error al crear el nuevo lector"})
    }
    
}


export const getLectores = async (req, res) => {
    const {storeLocation} = req.query;

    try {
        const lectores = await Lector.find({
            storeLocation: {$regex: storeLocation, $options: 'B'}
        })
        res.json(lectores)
    } catch (error) {
        res.status(500).json({error: "Error al obtener el lector"})
    }
}

export const getLectoresById = async (req, res) => {

    try {
        const lector = await Lector.findById(req.params.id)
        if(lector){
            res.json(lector)
        }else{
            res.status(404).json({ error: 'Lector no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID de lector invalido"})
    }

}