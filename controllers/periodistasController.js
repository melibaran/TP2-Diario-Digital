import Periodista from '../models/Periodista'
import Nota from '../models/Nota'

export const CrearPeriodista = async (req, res) => {
    const { idUsuario, categorias } = req.body;

    if (!idUsuario || !categorias) {
        return res.status(400).json({ error: "Faltan datos para crear un periodista" });
    }

    try {
        const nuevoPeriodista = await Periodista.create({
            idUsuario,
            categorias
        });

        res.status(201).json(nuevoPeriodista);
    } catch (error) {
        res.status(500).json({ error: "Error al crear un nuevo periodista" });
    }
};

export const getPeriodistas = async (req, res) => {
    try {
        const periodistas = await Periodista.find().populate("idUsuario");
        res.json(periodistas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los periodistas" });
    }
};

export const getPeriodistaById = async (req, res) => {
    try {
        const periodista = await Periodista.findById(req.params.id).populate("idUsuario");

        if (periodista) {
            res.json(periodista);
        } else {
            res.status(404).json({ error: 'Periodista no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: "ID de periodista inválido" });
    }
};

export const getNotasByPeriodista = async (req, res) => {
    try {
        const periodistaId = req.params.id;

        const notas = await Nota.find({ periodista: periodistaId }).populate("periodista");

        res.json(notas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener notas del periodista" });
    }
};
