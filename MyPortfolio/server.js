import config from './config/config.js';
import mongoose from 'mongoose';
import app from './server/express.js';
import { Contact, Project, Qualification, User } from './server/models/index.js';
if (!config.mongoUri || !config.jwtSecret || config.jwtSecret.length < 32) {
  console.error('Set MONGODB_URI and a JWT_SECRET of at least 32 characters in the root .env file.');
  process.exit(1);
}
try {
  await mongoose.connect(config.mongoUri, { dbName: 'Portfolio', serverSelectionTimeoutMS: 10000 });
  // Make all four collections visible even before inserting records.
  await Promise.all([Contact, Project, Qualification, User].map(model => model.init()));
  console.log('Connected to MongoDB database: Portfolio');
  const port = config.port;
  app.listen(port, () => console.log(`Portfolio backend running at http://localhost:${port}`));
} catch (err) {
  console.error('Startup failed:', err.message);
  process.exit(1);
}
