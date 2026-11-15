const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'pulse.db'));

// Оптимизация под параллельные запросы и защиту от блокировок
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 5000');
db.pragma('foreign_keys = ON');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'user',
      status TEXT DEFAULT 'active',
      frozen_until TEXT,
      membership TEXT DEFAULT 'none',
      membership_until TEXT,
      salt TEXT NOT NULL,
      hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      cat TEXT NOT NULL,
      trainer TEXT NOT NULL,
      room TEXT NOT NULL,
      start TEXT NOT NULL,
      dur INTEGER NOT NULL,
      cap INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      hall TEXT,
      trainer TEXT,
      plan TEXT,
      price INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active',
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_start ON sessions(start);
    CREATE INDEX IF NOT EXISTS idx_bookings_session_status ON bookings(session_id, status);
    CREATE INDEX IF NOT EXISTS idx_bookings_user_status ON bookings(user_id, status);
  `);

  const migrations = [
    "ALTER TABLE users ADD COLUMN membership TEXT DEFAULT 'none'",
    "ALTER TABLE users ADD COLUMN membership_until TEXT",
    "ALTER TABLE bookings ADD COLUMN hall TEXT",
    "ALTER TABLE bookings ADD COLUMN trainer TEXT",
    "ALTER TABLE bookings ADD COLUMN plan TEXT",
    "ALTER TABLE bookings ADD COLUMN price INTEGER DEFAULT 0"
  ];
  for (const sql of migrations) {
    try { db.exec(sql); } catch {}
  }

  console.log('База данных SQLite (pulse.db) готова [WAL + индексы].');
}

initDb();
module.exports = db;