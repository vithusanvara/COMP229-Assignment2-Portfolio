import mongoose from 'mongoose';
const text = { type: String, required: true, trim: true };
const schema = new mongoose.Schema({ firstname: text, lastname: text, email: { ...text, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, phone: { type: String, trim: true }, message: { type: String, trim: true } }, { versionKey: false });
export default mongoose.model('Contact', schema, 'contacts');
