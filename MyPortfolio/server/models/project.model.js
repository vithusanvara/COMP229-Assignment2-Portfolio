import mongoose from 'mongoose';
const text = { type: String, required: true, trim: true };
const schema = new mongoose.Schema({ title: text, firstname: text, lastname: text, email: { ...text, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, completion: { type: Date, required: true }, description: text }, { versionKey: false });
export default mongoose.model('Project', schema, 'projects');
