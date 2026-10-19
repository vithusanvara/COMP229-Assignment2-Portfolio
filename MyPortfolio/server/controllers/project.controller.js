import Project from '../models/project.model.js';
const fields = ['title', 'firstname', 'lastname', 'email', 'completion', 'description'];
const pick = body => Object.fromEntries(fields.filter(k => Object.hasOwn(body || {}, k)).map(k => [k, body[k]]));
const create = async (req, res) => res.status(201).json(await Project.create(pick(req.body)));
const list = async (_req, res) => res.json(await Project.find());
const projectByID = async (req, res, next, id) => {
  const record = await Project.findById(id);
  if (!record) return res.status(404).json({ message: 'Record not found.' });
  req.project = record;
  next();
};
const read = (req, res) => res.json(req.project);
const update = async (req, res) => {
  Object.assign(req.project, pick(req.body));
  await req.project.save();
  res.json(req.project);
};
const remove = async (req, res) => {
  await req.project.deleteOne();
  res.json({ message: 'Record deleted.', deletedCount: 1 });
};
const removeAll = async (_req, res) => {
  const result = await Project.deleteMany({});
  res.json({ message: 'All records deleted.', deletedCount: result.deletedCount });
};
export default { create, list, projectByID, read, update, remove, removeAll };
