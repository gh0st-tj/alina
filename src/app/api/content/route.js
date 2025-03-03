import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pageContent from '../../../content/pageContent';
import pageContentHe from '../../../content/pageContentHe';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { 
          status: 401,
          headers: {
            'Cache-Control': 'no-store, max-age=0',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    const token = authHeader.split(' ')[1];
    
    try {
      // Verify token with strict algorithm
      jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    } catch (error) {
      console.error('Token verification error:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { 
          status: 401,
          headers: {
            'Cache-Control': 'no-store, max-age=0',
            'Pragma': 'no-cache'
          }
        }
      );
    }

    // Only send content after successful authentication
    const response = NextResponse.json({
      success: true,
      content: {
        en: pageContent,
        he: pageContentHe
      }
    });

    // Set security headers
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    
    return response;
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 