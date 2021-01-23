// @ts-check
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Status = ['gold', 'silver', 'common'];
const Cities = ['Moscow', 'London', 'Paris'];
const Categories = ['Coffee', 'Tea'];
const Sections = ['One', 'Two'];
const Subsections = ['Four', 'Five'];

const schema = new Schema(
  {
    productPrice: { type: Number, required: true },
    backendDate: { type: Date, required: true },
    status: { type: String, enum: Status, required: true },
    city: { type: String, enum: Cities, required: true },
    category: { type: String, enum: Categories, required: true },
    section: { type: String, enum: Sections, required: true },
    subsection: { type: String, enum: Subsections, required: true },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
  }
);

module.exports = {
  Reference: {
    Status,
    Cities,
    Categories,
    Sections,
    Subsections,
  },
  AdModel: mongoose.model('AdModel', schema)
};

