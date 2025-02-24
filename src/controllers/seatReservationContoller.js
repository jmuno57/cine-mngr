const SeatReservation = require("../models/seatReservationModel");
const Shedule = require("../models/sheduleModels"); 
const Room = require("../models/roomModels"); 
const ses = require("../config/awsConfig");
exports.reserveSeats = async (req, res) => {
  const { name, email, seats, sheduleId } = req.body;

  try {
    const shedule = await Shedule.findById(sheduleId);
    if (!shedule) {
      return res.status(404).json({ message: "Cartelera no encontrada" });
    }

    const room = await Room.findById(shedule.room);
    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    if (seats.length > room.capacity) {
      return res.status(400).json({
        message:
          "La cantidad de asientos reservados excede la capacidad de la sala",
      });
    }

    const existingReservations = await SeatReservation.find({
      shedule: sheduleId,
      seats: { $in: seats },
    });

    if (existingReservations.length > 0) {
      const reservedSeats = existingReservations.flatMap((reservation) =>
        reservation.seats.filter((seat) => seats.includes(seat))
      );

      return res.status(400).json({
        message: "Algunos de los asientos ya están reservados",
        reservedSeats,
      });
    }

    const newReservation = new SeatReservation({
      name,
      email,
      seats,
      movie: shedule.movie.title,  
      room: room.name,          
    });

    await newReservation.save();
    console.log("Antes de ");
   
    const params = {
      Destination: {
        ToAddresses: [email],  
      },
      Message: {
        Body: {
          Text: {
            Data: `Hola ${name},\n\nTu reserva de asientos para la película ha sido confirmada.\n\nDetalles de la reserva:\nPelícula: ${shedule.movie.title}\nSala: ${room.name}\nFecha y Hora: ${shedule.startTime} - ${shedule.endTime}\nAsientos reservados: ${seats.join(", ")}\n\n¡Gracias por usar nuestro servicio de reservas!`
          },
        },
        Subject: {
          Data: "Reserva Exitosa",
        },
      },
      Source: "seb_0506@hotmail.com",  
    };

    // await ses.sendEmail(params).promise();
    res.status(200).json({
      message: "Reserva de asientos confirmada",
      reservation: newReservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al realizar la reserva", error });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await SeatReservation.find().populate("shedule");
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas", error });
  }
};
