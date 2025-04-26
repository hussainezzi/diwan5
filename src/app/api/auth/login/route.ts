// Suggested code may be subject to a license. Learn more: ~LicenseLog:1986656091.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2404892152.
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';




export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const user = await prisma.User.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    if (password!== user.password) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}