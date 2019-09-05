const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const RawData = new Schema(
  {
    id: String,
    name: String,
    description: String,
    auth: String,
    events: String,
    variables: [],
    order: [],
    folders_order: [],
    folders: [],
    requests: []
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("RawData", RawData);