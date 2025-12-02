const mongoose = require('mongoose');

const onCallSchema = mongoose.Schema(
  {
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    date: { type: String, required: true }, // Storing as YYYY-MM-DD string for easy comparison
    uploadedBy: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

onCallSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('OnCall', onCallSchema);
