import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const text = { type: String, required: true, trim: true };
const email = { ...text, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ };
const userSchema = new mongoose.Schema({
  name: text,
  email: { ...email, unique: true },
  password: { type: String, required: true, minlength: 8, select: false },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }, versionKey: false,
});
// Hash new passwords and passwords changed through document.save().
userSchema.pre('save', async function () {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12);
});
userSchema.set('toJSON', { transform(_doc, ret) { delete ret.password; return ret; } });
export default mongoose.model('User', userSchema, 'users');
