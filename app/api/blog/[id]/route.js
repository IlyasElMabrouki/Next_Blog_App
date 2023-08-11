import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { main } from '../route';

export async function GET(req) {
  try {
    const id = req.url.split('/blog/')[1];
    await main();
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post)
      return NextResponse.json({ message: 'Not Found' }, { status: 404 });
    return NextResponse.json({ message: 'Success', post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req) {
  try {
    const id = req.url.split('/blog/')[1];
    const { title, description } = await req.json();
    await main();
    const newPost = await prisma.post.update({
      where: { id },
      data: { title, description },
    });
    return NextResponse.json({ message: 'Success', newPost }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req) {
  try {
    const id = req.url.split('/blog/')[1];
    await main();
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
