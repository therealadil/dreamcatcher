import './globals.css';
"use Client";



export const metadata = {
  title: "Dreamcatcher",
  description: "Capture and interpret your dreams.",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>
          <h1>Dreamcatcher</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 Dreamcatcher</p>
        </footer>
      </body>
    </html>
  );
}


