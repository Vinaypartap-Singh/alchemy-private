import { openDB } from '@/lib/db.mjs';

export async function POST(req) {
    const db = await openDB();
    const { title, content, featuredImage, userinfo } = await req.json();
    const publishedAt = new Date().toISOString();
    
    await db.run('INSERT INTO blogs (title, content, featuredImage, userinfo, publishedAt) VALUES (?, ?, ?, ?, ?)', [title, content, featuredImage, JSON.stringify(userinfo), publishedAt]);

    return new Response(JSON.stringify({ message: 'Blog published successfully' }), { status: 200 });
}

export async function GET() {
    const db = await openDB();
    const blogs = await db.all('SELECT * FROM blogs');
    return new Response(JSON.stringify(blogs), { status: 200 });
}

export async function DELETE(req) {
    const db = await openDB();
    const { id } = await req.json();
    await db.run('DELETE FROM blogs WHERE id = ?', [id]);
    return new Response(JSON.stringify({ message: 'Blog deleted' }), { status: 200 });
}
