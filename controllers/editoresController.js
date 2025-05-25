import Editor from '../models/Editor'

export const CrearEditor = async (req, res) => {
    const { idUsuario, notas } = req.body;

    if (!idUsuario || !Array.isArray(notas)) {
        return res.status(400).json({ error: "Faltan datos o 'notas' no es un array" });
    }

    try {
        const nuevoEditor = await Editor.create({ idUsuario, notas });
        res.status(201).json(nuevoEditor);
    } catch (error) {
        res.status(500).json({ error: "Error al crear un nuevo editor" });
    }
};

export const getEditores = async (req, res) => {
    try {
        const editores = await Editor.find()
            .populate("idUsuario")
            .populate("notas");
        res.json(editores);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los editores" });
    }
};

export const getEditoresById = async (req, res) => {
    try {
        const editor = await Editor.findById(req.params.id)
            .populate("idUsuario")
            .populate("notas");

        if (editor) {
            res.json(editor);
        } else {
            res.status(404).json({ error: 'Editor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: "ID de editor inválido" });
    }
};
