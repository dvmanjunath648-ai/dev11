const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema(
  {
    report: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: String,
    status: {
      type: String,
      enum: ["requested", "approved", "rejected"],
      default: "requested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adoption", adoptionSchema);