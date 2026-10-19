import User from '../models/user.model.js';
const fields = ['name', 'email', 'password'];
const pick = body => Object.fromEntries(fields.filter(k => Object.hasOwn(body || {}, k)).map(k => [k, body[k]]));
const create = async (req, res) => res.status(201).json(await User.create(pick(req.body)));
const list = async (_req, res) => res.json(await User.find());
const userByID = async (req, res, next, id) => {
  const record = await User.findById(id);
  if (!record) return res.status(404).json({ message: 'Record not found.' });
  req.profile = record;
  next();
};
const read = (req, res) => res.json(req.profile);
const update = async (req, res) => {
  Object.assign(req.profile, pick(req.body));
  await req.profile.save();
  res.json(req.profile);
};
const remove = async (req, res) => {
  await req.profile.deleteOne();
  res.json({ message: 'Record deleted.', deletedCount: 1 });
};
const removeAll = async (_req, res) => {
  const result = await User.deleteMany({});
  res.json({ message: 'All records deleted.', deletedCount: result.deletedCount });
};
export default { create, list, userByID, read, update, remove, removeAll };
