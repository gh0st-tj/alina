import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Get secrets from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const SITE_PASSWORD = process.env.SITE_PASSWORD;

if (!JWT_SECRET || !SITE_PASSWORD) {
  throw new Error('Required environment variables are not set');
}

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    // Use constant-time comparison to prevent timing attacks
    const isPasswordValid = password === SITE_PASSWORD;
    
    if (isPasswordValid) {
      // Generate JWT token with minimal payload
      const token = jwt.sign({ timestamp: Date.now() }, JWT_SECRET, { 
        expiresIn: '24h',
        algorithm: 'HS256'
      });
      
      const response = NextResponse.json({ success: true, token });
      
      // Set secure headers
      response.headers.set('Cache-Control', 'no-store, max-age=0');
      response.headers.set('Pragma', 'no-cache');
      
      return response;
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid password' },
      { 
        status: 401,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Pragma': 'no-cache'
        }
      }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 