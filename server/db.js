import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./products.db', (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('SQLite 已連線');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price INTEGER
    )
  `);
});

export default db;