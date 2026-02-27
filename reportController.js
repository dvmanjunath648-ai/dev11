const Report = require("../models/Report");
const Notification = require("../models/Notification");

exports.createReport = async (req, res) => {
  const report = await Report.create({
    ...req.body,
    image: req.file?.filename,
    reportedBy: req.user._id,
  });

  // Notify NGOs
  await Notification.create({
    user: req.user._id,
    message: "Your report has been submitted successfully.",
  });

  res.status(201).json(report);
};

exports.getReports = async (req, res) => {
  const { city, state } = req.query;

  const filter = {};
  if (city) filter.city = city;
  if (state) filter.state = state;

  const reports = await Report.find(filter).populate("reportedBy");
  res.json(reports);
};

exports.getReportById = async (req, res) => {
  const report = await Report.findById(req.params.id);
  res.json(report);
};

exports.updateReport = async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(report);
};

exports.deleteReport = async (req, res) => {
  await Report.findByIdAndDelete(req.params.id);
  res.json({ message: "Report deleted" });
};