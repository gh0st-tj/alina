import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import { AuthProvider } from '../context/AuthContext';
import LanguageToggle from '../components/LanguageToggle';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Our Second Chance',
  description: 'A journey worth continuing together',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <LanguageToggle />
            {children}
            <Analytics />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 