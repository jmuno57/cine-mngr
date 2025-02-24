const Shedule = require('../models/sheduleModels');

exports.createBillboard = async (req, res) => {
  console.log('req', req.body);
  try {
    const { movieId, roomId, startTime, endTime } = req.body;

    const availableShedule = await Shedule.findOne({
      movie: movieId,
      room: roomId,
      isActive: true,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: endTime }, endTime: { $lte: startTime } }
      ],
    });
    if (availableShedule) {
      return res.status(400).json({ message: 'La franja horaria seleccionada ya está ocupada' });
    }

    const newShedule = new Shedule({
      movie: movieId,
      room: roomId,
      startTime,
      endTime,
      isActive: true,
    });

    await newShedule.save();

    res.status(200).json({ message: 'Cartelera confirmada', shedule: newShedule });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear la cartelera', error: err });
  }
};

exports.getBillboards = async (req, res) => {
  try {
    const billboards = await Shedule.find();
    res.status(200).json(billboards);
  } catch (err) {
    res.status(400).json({ message: 'Error al obtener los Horarios', error: err });
  }
};
