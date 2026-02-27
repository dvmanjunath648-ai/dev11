const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    animalType: String,
    description: String,
    image: String,
    address: String,
    city: String,
    state: String,
    status: {
      type: String,
      enum: ["pending", "rescued", "adopted"],
      default: "pending",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);