// Suggested code may be subject to a license. Learn more: ~LicenseLog:1217083274.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1670261712.
import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password: password,
      },
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}