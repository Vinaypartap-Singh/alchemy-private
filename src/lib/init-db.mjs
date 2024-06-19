import { openDB } from './db.mjs';

(async () => {
    const db = await openDB();
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      publicKey TEXT,
      username TEXT DEFAULT NULL,
      profilePicture TEXT DEFAULT NULL
    )
  `);
})();
