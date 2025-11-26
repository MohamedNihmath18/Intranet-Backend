const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String, default: 'Building' }, // Lucide icon name
    resources: [
      {
        title: { type: String, required: true },
        type: { 
          type: String, 
          enum: ['ORG_CHART', 'ROSTER', 'MEMO', 'SOP', 'FAQ'], 
          required: true 
        },
        url: { type: String, required: true }, // URL or Base64
        fileType: { type: String }, // pdf, img, etc
        uploadedBy: { type: String },
        date: { type: Date, default: Date.now }
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    timestamps: true
  }
);

departmentSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Department', departmentSchema);