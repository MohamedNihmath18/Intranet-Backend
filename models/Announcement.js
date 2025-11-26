const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    authorName: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  {
    toJSON: { virtuals: true },
  }
);

announcementSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Announcement', announcementSchema);