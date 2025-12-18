import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : undefined;

    const event = await Event.create({
      ...req.body,
      createdBy: req.userId,
      image: imageUrl,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find().populate("createdBy", "name");
  res.json(events);
};

export const updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== req.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  Object.assign(event, req.body);
  if (req.file) {
    event.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }
  await event.save();

  res.json(event);
};

export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== req.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await event.deleteOne();
  res.json({ message: "Event deleted" });
};
