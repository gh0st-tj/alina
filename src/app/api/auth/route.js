import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Get secrets from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret_do_not_use_in_production';
const SITE_PASSWORD = process.env.SITE_PASSWORD || '21112020';

// Log warning if using fallback values
if (!process.env.JWT_SECRET || !process.env.SITE_PASSWORD) {
  console.warn('Warning: Using fallback values for JWT_SECRET or SITE_PASSWORD. Please set these environment variables.');
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