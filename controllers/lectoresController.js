import Lector from "../models/Lector.js";

export const CrearLector = async (req, res) => {
  const { idUsuario, esPremium } = req.body;
  if (!idUsuario || esPremium === undefined) {
    return res.status(400).json({ error: "Faltan datos para crear el lector" });
  }

  const lector = {
    idUsuario,
    esPremium,
    notasGuardadas: [],
    comentarios: [],
  };
  try {
    const nuevoLector = await Lector.create(lector);
    res.status(201).json(nuevoLector);
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el nuevo lector. Detalles del error: " + error,
    });
  }
};

export const getLectores = async (req, res) => {
  const { storeLocation } = req.query;

  try {
    const lectores = await Lector.find({
      storeLocation: { $regex: storeLocation, $options: "B" },
    });
    res.json(lectores);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el lector. Detalles del error: " + error,
    });
  }
};

export const getLectoresById = async (req, res) => {
  try {
    const lector = await Lector.findById(req.params.id);
    if (lector) {
      res.json(lector);
    } else {
      res.status(404).json({ error: "Lector no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "ID de lector invalido" });
  }
};

export const editarDatos = async (req, res) => {
  const { esPremium, notasGuardadas, comentarios } = req.body;

  try {
    const lector = await Lector.findById(req.params.id);

    if (!lector) {
      return res.status(404).json({ error: "Lector no encontrado" });
    }

    if (esPremium !== undefined) lector.esPremium = esPremium;
    if (notasGuardadas !== undefined) lector.notasGuardadas = notasGuardadas;
    if (comentarios !== undefined) lector.comentarios = comentarios;

    const lectorActualizado = await lector.save();
    res.json(lectorActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al editar el lector. Detalles: " + error });
  }
};

