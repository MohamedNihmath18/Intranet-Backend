const mongoose = require('mongoose');

const onCallSchema = mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., "March 2024 Roster"
    month: { type: String, required: true },
    fileUrl: { type: String, required: true }, // Base64 or URL
    fileType: { type: String, default: 'img' },
    uploadedBy: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

onCallSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('OnCall', onCallSchema);