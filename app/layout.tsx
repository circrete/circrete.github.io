import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js on GitHub Pages',
  description: 'Deploy your static Next.js site to GitHub Pages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-circrete-mokka text-circrete-red max-w-screen-md mx-auto">
        <div className="bg-red-50">{children}</div>
      </body>
    </html>
  );
}
