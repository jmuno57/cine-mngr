const Shedule = require('../models/sheduleModels');
exports.createShedule = async (req, res) => {
  console.log('Servicio', req)
  try {
    const { movieId, roomId, startTime, endTime } = req.body;

    const newShedule = new Shedule({
      movie: movieId,
      room: roomId,
      startTime,
      endTime,
    });

    await newShedule.save();
    res.status(201).json({ message: 'Horario creada con éxito', shedule: newShedule });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear Horario', error: err });
  }
};

exports.getShedules = async (req, res) => {
  try {
    const shedules = await Shedule.find();
    res.status(200).json(shedules);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los Horarios', error: err });
  }
};
