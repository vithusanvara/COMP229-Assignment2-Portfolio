import Qualification from '../models/qualification.model.js';
const fields = ['title', 'firstname', 'lastname', 'email', 'completion', 'description'];
const pick = body => Object.fromEntries(fields.filter(k => Object.hasOwn(body || {}, k)).map(k => [k, body[k]]));
const create = async (req, res) => res.status(201).json(await Qualification.create(pick(req.body)));
const list = async (_req, res) => res.json(await Qualification.find());
const qualificationByID = async (req, res, next, id) => {
  const record = await Qualification.findById(id);
  if (!record) return res.status(404).json({ message: 'Record not found.' });
  req.qualification = record;
  next();
};
const read = (req, res) => res.json(req.qualification);
const update = async (req, res) => {
  Object.assign(req.qualification, pick(req.body));
  await req.qualification.save();
  res.json(req.qualification);
};
const remove = async (req, res) => {
  await req.qualification.deleteOne();
  res.json({ message: 'Record deleted.', deletedCount: 1 });
};
const removeAll = async (_req, res) => {
  const result = await Qualification.deleteMany({});
  res.json({ message: 'All records deleted.', deletedCount: result.deletedCount });
};
export default { create, list, qualificationByID, read, update, remove, removeAll };
