const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, default: '' },
  tags: [String],
  isFavorite: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
