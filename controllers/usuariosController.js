import Usuario from "../models/Usuario.js"
import bcrypt from "bcryptjs";

export const CrearUsuario = async (req, res) => { 

    const { username, email, nombreYApellido, password, fechaAlta, esAdmin, estaActivo} = req.body;
    if(!username || !email || !nombreYApellido || !password || !fechaAlta || !esAdmin || !estaActivo){
        return res.status(400).json({error: "Faltan datos para crear el usuario"})
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const usuario = {
            username, 
            email, 
            nombreYApellido, 
            password: hashedPassword, 
            fechaAlta,
            esAdmin, 
            estaActivo, 
            }

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


export const getUsuariosSearch = async (req, res) => {
    const { nombre } = req.query;
    try {
        const usuarios = await Usuario.find({
            nombre: { $regex: nombre, $options: 'i' }
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
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



//TO-DO
// Actualizar imagen de perfil en Supabase
export const actualizarProfilePic = async (req, res) => {
    const { usuario } = req;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = `usuarios/${usuario.id}/profilePic/${fileName}`;

    try {
        const { error: uploadError } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: true
            });

        if (uploadError) {
            return res.status(500).json({ error: 'Error al subir la imagen a Supabase' });
        }

        const { data: publicUrlData } = supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(filePath);

        const profilePicUrl = publicUrlData.publicUrl;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            usuario.id,
            { profile_pic: profilePicUrl },
            { new: true }
        );

        res.json({
            msg: 'Imagen actualizada correctamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la imagen' });
    }
}