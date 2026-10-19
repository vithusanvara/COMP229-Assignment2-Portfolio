const handleError = (err, _req, res, _next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError')
    return res.status(400).json({ message: err.message });
  if (err.code === 11000) return res.status(409).json({ message: 'Email already exists.' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid JSON.' });
  console.error(err);
  res.status(500).json({ message: 'An internal server error occurred.' });
};
export default { handleError };
