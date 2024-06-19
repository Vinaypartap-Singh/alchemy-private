import { openDB } from '@/lib/db.mjs';

export async function POST(req) {
  const db = await openDB();
  const { publicKey } = await req.json();
  const user = await db.get('SELECT * FROM users WHERE publicKey = ?', [publicKey]);

  if (user) {
    return new Response(JSON.stringify(user), { status: 200 });
  } else {
    const newUser = {
      publicKey,
      username: null,
      profilePicture: null,
    };
    await db.run('INSERT INTO users (publicKey, username, profilePicture) VALUES (?, ?, ?)', [publicKey, newUser.username, newUser.profilePicture]);
    return new Response(JSON.stringify(newUser), { status: 200 });
  }
}

export async function GET() {
  const db = await openDB();
  const users = await db.all('SELECT * FROM users');
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function DELETE(req) {
  const db = await openDB();
  const { id } = await req.json();
  await db.run('DELETE FROM users WHERE id = ?', [id]);
  return new Response(JSON.stringify({ message: 'User deleted' }), { status: 200 });
}
