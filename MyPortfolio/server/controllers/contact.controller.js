import Contact from '../models/contact.model.js';
const fields = ['firstname', 'lastname', 'email', 'phone', 'message'];
const pick = body => Object.fromEntries(fields.filter(k => Object.hasOwn(body || {}, k)).map(k => [k, body[k]]));
const create = async (req, res) => res.status(201).json(await Contact.create(pick(req.body)));
const list = async (_req, res) => res.json(await Contact.find());
const contactByID = async (req, res, next, id) => {
  const record = await Contact.findById(id);
  if (!record) return res.status(404).json({ message: 'Record not found.' });
  req.contact = record;
  next();
};
const read = (req, res) => res.json(req.contact);
const update = async (req, res) => {
  Object.assign(req.contact, pick(req.body));
  await req.contact.save();
  res.json(req.contact);
};
const remove = async (req, res) => {
  await req.contact.deleteOne();
  res.json({ message: 'Record deleted.', deletedCount: 1 });
};
const removeAll = async (_req, res) => {
  const result = await Contact.deleteMany({});
  res.json({ message: 'All records deleted.', deletedCount: result.deletedCount });
};
export default { create, list, contactByID, read, update, remove, removeAll };
