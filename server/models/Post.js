const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    status: { type: String, enum: ['TO DO', 'DOING', 'DONE'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }

}, {
    timestamps: true
})

module.exports = mongoose.model('posts', PostSchema);
