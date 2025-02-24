const Room = require("../models/roomModels");

exports.createRoom = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const newRoom = new Room({
      name,
      capacity,
    });
    await newRoom.save();
    res
      .status(201)
      .json({ message: "Sala creada con éxito", movie: newRoom });
  } catch (err) {
    res.status(400).json({ message: "Error al crear sala", error: err });
  }
};

// Obtener todas las películas
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error al obtener las películas", error: err });
  }
};
