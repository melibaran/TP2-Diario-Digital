import Editor from "../models/Editor.js";

export const CrearEditor = async (req, res) => {
  const { idUsuario } = req.body;

  if (!idUsuario) {
    return res
      .status(400)
      .json({ error: "Faltan datos o 'notas' no es un array" });
  }

  try {
    const nuevoEditor = await Editor.create({ idUsuario, notas: [] });
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
      res.status(404).json({ error: "Editor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "ID de editor inválido" });
  }
};

export const editarDatos = async (req, res) => {
  const { notas } = req.body;

  try {
    const editor = await Editor.findById(req.params.id)
      .populate("idUsuario")
      .populate("notas");

    if (!editor) {
      return res.status(404).json({ error: "Editor no encontrado" });
    }

    if (notas !== undefined) {
      editor.notas = notas;
    }

    const editorActualizado = await editor.save();
    res.json(editorActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al editar el editor" });
  }
};

export const getComentariosDeEditores = async (req, res) => {
  try {
    const editor = await Editor.findById(req.params.id).populate({
      path: "notas",
      populate: { path: "comentarios" },
    });

    if (!editor) {
      return res.status(404).json({ error: "Editor no encontrado" });
    }

    const comentarios = editor.notas.flatMap((nota) => nota.comentarios);

    res.json(comentarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener comentarios de las notas del editor" });
  }
};
