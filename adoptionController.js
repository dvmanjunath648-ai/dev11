const Adoption = require("../models/Adoption");
const Notification = require("../models/Notification");

// Express interest in adoption
exports.createAdoptionRequest = async (req, res, next) => {
  try {
    const { reportId } = req.body;

    const adoption = await Adoption.create({
      user: req.user._id,
      report: reportId,
      status: "pending",
    });

    await Notification.create({
      message: `New adoption request submitted`,
      type: "adoption",
    });

    res.status(201).json(adoption);
  } catch (error) {
    next(error);
  }
};

// Get adoption requests (NGO dashboard)
exports.getAdoptions = async (req, res, next) => {
  try {
    const adoptions = await Adoption.find()
      .populate("user", "name email")
      .populate("report");

    res.json(adoptions);
  } catch (error) {
    next(error);
  }
};

// Update adoption status
exports.updateAdoptionStatus = async (req, res, next) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({ message: "Not found" });
    }

    adoption.status = req.body.status;
    await adoption.save();

    res.json(adoption);
  } catch (error) {
    next(error);
  }
};