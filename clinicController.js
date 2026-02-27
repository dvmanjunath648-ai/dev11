const Clinic = require("../models/Clinic");

// ===================================
// @desc    Create new clinic (Admin/NGO)
// @route   POST /api/clinics
// @access  Private (ngo/admin)
// ===================================
exports.createClinic = async (req, res) => {
  try {
    const { name, address, city, state, phone, location } = req.body;

    const clinic = await Clinic.create({
      name,
      address,
      city,
      state,
      phone,
      location, // { type: "Point", coordinates: [lng, lat] }
      createdBy: req.user._id,
    });

    res.status(201).json(clinic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================================
// @desc    Get all clinics
// @route   GET /api/clinics
// @access  Public
// ===================================
exports.getClinics = async (req, res) => {
  try {
    const { city, state } = req.query;

    let filter = {};
    if (city) filter.city = city;
    if (state) filter.state = state;

    const clinics = await Clinic.find(filter);

    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================================
// @desc    Get nearby clinics (Geo search)
// @route   GET /api/clinics/nearby
// @access  Public
// ===================================
exports.getNearbyClinics = async (req, res) => {
  try {
    const { lng, lat } = req.query;

    const clinics = await Clinic.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // 5km
        },
      },
    });

    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};