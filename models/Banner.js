const mongoose = require('mongoose');

const bannerSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    cta: { type: String, default: 'Learn More' },
    image: { type: String, required: true }, // Storing base64 or URL
    iconName: { type: String, required: true },
    theme: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
  }
);

bannerSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Banner', bannerSchema);