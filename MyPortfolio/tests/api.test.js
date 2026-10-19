import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../server/express.js';
let db, token;
before(async () => {
  process.env.JWT_SECRET = 'integration-test-secret-with-more-than-32-characters';
  db = await MongoMemoryServer.create({ instance: { args: ['--nounixsocket'] } });
  await mongoose.connect(db.getUri(), { dbName: 'Portfolio' });
});
after(async () => { await mongoose.disconnect(); if (db) await db.stop(); });
test('CRUD, validation, password hashing and JWT lifecycle', async () => {
  const api = request(app);
  await api.get('/').expect(200);
  await api.get('/api/contacts').expect(401);
  const user = await api.post('/api/users').send({ name: 'Test User', email: 'test@example.com', password: 'DemoPass123!' }).expect(201);
  assert.equal(user.body.password, undefined);
  const login = await api.post('/api/auth/signin').send({ email: 'test@example.com', password: 'DemoPass123!' }).expect(200);
  token = login.body.token;
  const auth = { Authorization: `Bearer ${token}` };
  await api.get('/api/auth/me').set(auth).expect(200);
  await api.post('/api/auth/signin').send({ email: 'test@example.com', password: 'wrong' }).expect(401);
  for (const resource of ['contacts', 'projects', 'qualifications', 'users']) {
    const data = resource === 'users'
      ? { name: 'Second User', email: 'second@example.com', password: 'OtherPass123!' }
      : { firstname: 'Demo', lastname: 'Student', email: 'demo@example.com',
          ...(resource === 'contacts' ? {} : { title: 'Demo', completion: '2026-10-18', description: 'Test item' }) };
    const base = `/api/${resource}`;
    const created = await api.post(base).set(auth).send(data).expect(201);
    const id = created.body._id;
    await api.get(base).set(auth).expect(200);
    await api.get(`${base}/${id}`).set(auth).expect(200);
    const patch = resource === 'users' ? { name: 'Updated', password: 'ChangedPass123!' } : { firstname: 'Updated' };
    const updated = await api.put(`${base}/${id}`).set(auth).send(patch).expect(200);
    assert.equal(updated.body[resource === 'users' ? 'name' : 'firstname'], 'Updated');
    if (resource === 'users') {
      await api.post('/api/auth/signin').send({ email: data.email, password: 'ChangedPass123!' }).expect(200);
      assert.equal(updated.body.password, undefined);
    }
    await api.get(`${base}/bad-id`).set(auth).expect(400);
    await api.delete(`${base}/${id}`).set(auth).expect(200);
    await api.get(`${base}/${id}`).set(auth).expect(404);
    if (resource !== 'users') await api.delete(base).set(auth).expect(200);
  }
  await api.post('/api/contacts').send({ firstname: 'Missing' }).expect(400);
  await api.post('/api/auth/signout').set(auth).expect(200);
  await api.get('/api/auth/me').set(auth).expect(401);
  const fresh = await api.post('/api/auth/signin').send({ email: 'test@example.com', password: 'DemoPass123!' }).expect(200);
  // A unique jti ensures signing in immediately after logout issues a new token.
  await api.delete('/api/users').set({ Authorization: `Bearer ${fresh.body.token}` }).expect(200);
});
