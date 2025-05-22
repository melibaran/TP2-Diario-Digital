import Negocio from "../models/Nota.js"

//TO-DO:
export const CreateNegocio = async (req, res) => { 

    const { nombre, direccion, storeLocation } = req.body;
    if(!nombre || !direccion || !storeLocation){
        return res.status(400).json({error: "Faltan datos para crear el Negocio"})
    }
    
    const negocio = {
        nombre, 
        direccion, 
        storeLocation}

    try {
        const nuevoNegocio = await Negocio.create(negocio)
        res.status(201).json(nuevoNegocio)
    } catch (error) {
        res.status(500).json({error: "Error al crear el nuevo negocio"})
    }
    
}


export const getNegocios = async (req, res) => {
    const {storeLocation} = req.query;

    try {
        const negocios = await Negocio.find({
            storeLocation: {$regex: storeLocation, $options: 'B'}
        })
        res.json(negocios)
    } catch (error) {
        res.status(500).json({error: "Error al obtener negocios"})
    }
}