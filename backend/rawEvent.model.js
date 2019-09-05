const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const RawEvent = new Schema(
  {
    name: String,
    listen: String,
    scriptId: String,
    scriptExec: [],
    scripttype: String,
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("RawEvent", RawEvent);