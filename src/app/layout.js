import './globals.css'

export default function RootLayout({ children }) {

  const manifests = {
    "title": "This is next js app title"
  }

  return (
    <html lang="en" className='h-full'>
      <body className='h-full w-full'>
        {children}
      </body>
    </html>
  );
}
