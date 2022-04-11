import { Database } from '../index';

import fs from 'fs';

const file = './demo_database';

function cleanup() {
  if (fs.existsSync(file + '.json')) {
    fs.unlinkSync(file + '.json');
  }
}

describe('Database', () => {

  beforeEach(() => {
    cleanup();
  });

  afterAll(() => {
    cleanup();
  });

  it('should be defined', () => {
    expect(Database).toBeDefined();
  });

  it('should create a new database', () => {
    const db = new Database(file);
    expect(db).toBeDefined();
  });

  it('should write to disk', () => {
    const db = new Database(file);
    db.collection('fake').push({ name: 'hello' });
    db.sync();
    expect(fs.existsSync(file + '.json')).toBeTruthy();
  });

  it('should write and then read from disk', () => {
    const db = new Database(file);
    db.collection('fake').push({ name: 'hello' });
    db.sync();

    const db2 = new Database(file);

    expect(db2.collection('fake').length).toBe(1);
    expect(db2.collection('fake')[0]).toEqual({ name: 'hello' });
  })
});
