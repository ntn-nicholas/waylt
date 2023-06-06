import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';
 
export const config = { matcher: '/get_feed' };
 
export async function middleware() {
  const greeting = await get('data');
  return NextResponse.json(greeting);
}
