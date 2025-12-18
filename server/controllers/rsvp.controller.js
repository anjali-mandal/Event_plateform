import Event from "../models/Event.js";

export const rsvpEvent = async (req, res) => {
  const event = await Event.findOneAndUpdate(
    {
      _id: req.params.id,
      attendees: { $ne: req.userId },
      $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
    },
    { $push: { attendees: req.userId } },
    { new: true }
  );

  if (!event) {
    return res.status(400).json({
      message: "Event is full or already joined",
    });
  }

  res.json(event);
};

export const leaveEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { $pull: { attendees: req.userId } },
    { new: true }
  );

  res.json(event);
};
