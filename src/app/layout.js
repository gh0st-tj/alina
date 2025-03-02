import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'Our Second Chance',
  description: 'A journey worth continuing together',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LanguageToggle />
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
} 