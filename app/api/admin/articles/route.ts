import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/api/blog';

export async function GET() {
  try {
    const { articles } = await getAllArticles({
      page: 1,
      pageSize: 100
    });
    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 });
  }
} 