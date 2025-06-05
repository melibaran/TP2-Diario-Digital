import Usuario from "../models/Usuario.js"

export const CrearUsuario = async (req, res) => { 

    const { username, email, nombreYApellido, password, fechaAlta, esAdmin, estaActivo} = req.body;
    if(!username || !email || !nombreYApellido || !password || !fechaAlta || !esAdmin || !estaActivo){
        return res.status(400).json({error: "Faltan datos para crear el usuario"})
    }
    
    const usuario = {
        username, 
        email, 
        nombreYApellido, 
        password, 
        fechaAlta,
        esAdmin, 
        estaActivo, 
        }

    try {
        const nuevoUsuario = await Usuario.create(usuario)
        res.status(201).json(nuevoUsuario)
    } catch (error) {
        res.status(500).json({error: "Error al crear el nuevo usuario. Detalles del error: " + error})
    }
    
}


export const getUsuarios = async (req, res) => {
    const {storeLocation} = req.query;

    try {
        const usuario = await Usuario.find({
            storeLocation: {$regex: storeLocation, $options: 'B'}
        })
        res.json(usuario)
    } catch (error) {
        res.status(500).json({error: "Error al obtener usuarios. Detalle del error: " + error})
    }
}

export const getUsuariosById = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.params.id)
        if(usuario){
            res.json(usuario)
        }else{
            res.status(404).json({ error: 'Usuario no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID de usuario invalido. Detalles del error: " + error})
    }

}


