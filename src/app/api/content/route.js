import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pageContent from '../../../content/pageContent';
import pageContentHe from '../../../content/pageContentHe';

const JWT_SECRET = process.env.JWT_SECRET || '21112020_secret_key';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    // Only send content after successful authentication
    return NextResponse.json({
      success: true,
      content: {
        en: pageContent,
        he: pageContentHe
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
} 