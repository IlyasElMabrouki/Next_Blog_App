import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function main() {
  try {
    prisma.$connect();
  } catch (error) {
    return Error('Connection to database Failed');
  }
}

export async function GET() {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: 'Success', posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    await main();
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: 'Success', newPost }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
