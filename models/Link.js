const mongoose = require('mongoose');

const linkSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
  },
  {
    toJSON: { virtuals: true },
  }
);

linkSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Link', linkSchema);