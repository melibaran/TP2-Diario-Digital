import Nota from "../models/Nota.js"

export const home = (req, res) => {
    res.send(`<h1>Home del Diaroi Digital</h1>`)
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

export const CrearNota = async (req, res) => {  

    const { fecha, idAutor, titulo, categoria, resumen, imagenes , texto} = req.body;
    if(!fecha || !idAutor || !titulo || !categoria 
        || !resumen || !imagenes || !texto){
        return res.status(400).json({error: "Faltan datos"})
    }

    const nota = {
        fecha,
        idAutor,
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
        res.status(500).json({error: "Error al crear la nota"})
    }
    
}


