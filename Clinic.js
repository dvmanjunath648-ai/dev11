const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    city: String,
    state: String,
    phone: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

clinicSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Clinic", clinicSchema);