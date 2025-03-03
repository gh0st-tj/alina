import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pageContent from '../../../content/pageContent';
import pageContentHe from '../../../content/pageContentHe';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret_do_not_use_in_production';

// Log warning if using fallback value
if (!process.env.JWT_SECRET) {
  console.warn('Warning: Using fallback value for JWT_SECRET. Please set this environment variable.');
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