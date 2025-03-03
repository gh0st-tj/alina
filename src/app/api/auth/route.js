import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '21112020_secret_key';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    if (password === '21112020') {
      // Generate JWT token
      const token = jwt.sign({}, JWT_SECRET, { expiresIn: '24h' });
      
      return NextResponse.json({ success: true, token });
    }
    
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
} 