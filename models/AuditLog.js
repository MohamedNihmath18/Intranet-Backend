const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema(
  {
    actorName: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
  }
);

auditLogSchema.options.toJSON.transform = function (doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('AuditLog', auditLogSchema);