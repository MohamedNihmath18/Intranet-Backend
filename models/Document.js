const mongoose = require('mongoose');

const documentSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    uploadedBy: { type: String, required: true },
    date: { type: Date, default: Date.now },
    size: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, default: '#' },
    fileName: { type: String },
  },
  {
    toJSON: { virtuals: true },
  }
);

documentSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Document', documentSchema);