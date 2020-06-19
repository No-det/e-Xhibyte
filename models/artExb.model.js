const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let artExbSchema = new Schema({
  userId: { type: String },
  name: { type: String },
  organizer: { type: String },
  location: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  imgUrl: { type: String, default: "defaultExbPic.png" },
  status: { type: String, default: "upcoming" },
  statusMessage: { type: String, default: "Upcoming Event" },
  applicantId: [{ type: String }],
});

module.exports = mongoose.model("artExb", artExbSchema);
