import Periodista from "../models/Periodista.js";

export const CrearPeriodista = async (req, res) => { 

    const { idUsuario, categorias} = req.body;
    if(!idUsuario || !categorias){
        return res.status(400).json({error: "Faltan datos para crear el periodista"})
    }
    
    const periodista = {
        idUsuario, 
        categorias, 
        }

    try {
        const nuevoPeriodista = await Periodista.create(periodista)
        res.status(201).json(nuevoPeriodista)
    } catch (error) {
        res.status(500).json({error: "Error al crear el nuevo periodista"})
    }
    
}


export const getPeriodistas = async (req, res) => {
    const {storeLocation} = req.query;

    try {
        const periodista = await Periodista.find({
            storeLocation: {$regex: storeLocation, $options: 'B'}
        })
        res.json(periodista)
    } catch (error) {
        res.status(500).json({error: "Error al obtener periodistas"})
    }
}

export const getPeriodistasById = async (req, res) => {

    try {
        const periodista = await Periodista.findById(req.params.id)
        if(periodista){
            res.json(periodista)
        }else{
            res.status(404).json({ error: 'Periodista no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID de periodista invalido"})
    }
}





