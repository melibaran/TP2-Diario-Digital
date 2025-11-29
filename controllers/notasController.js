import Nota from "../models/Nota.js"
import Periodista from "../models/Periodista.js";
import Comentario from "../models/Comentario.js";
import supabase from '../config/supabase.js';


export const crearNota = async (req, res) => {
    const { fecha, idPeriodista, titulo, categoria, resumen, texto} = req.body;
    const file = req.files && req.files.length > 0 ? req.files[0] : null;

    if(!fecha || !idPeriodista || !titulo || !categoria 
    || !resumen || !texto){        
        return res.status(400).json({ error: "Faltan datos" });
    }

    let imageUrl = "";

    if (file) {
        const fileName = `${Date.now()}_${file.originalname}`;
        const filePath = `nota/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                upsert: true
            });

        if (uploadError) {
            return res.status(500).json({ error: "Error al subir la imagen" });
        }

        const { data: publicUrlData, error: urlError } = supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .getPublicUrl(filePath);

        if (urlError || !publicUrlData?.publicUrl) {
            return res.status(500).json({ error: "Error al obtener la URL pública" });
        }

        imageUrl = publicUrlData.publicUrl;
    }

    try {
        const nuevaNota = await Nota.create({
            fecha,
            idPeriodista: idPeriodista,
            titulo,
            categoria,
            resumen,
            texto,
            imagenes: imageUrl,

        });
        res.status(201).json(nuevaNota);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la nota", errorMsg: error.message });
    }
};

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
