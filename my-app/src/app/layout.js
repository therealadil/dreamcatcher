/**
 * The root layout component for the Dreamcatcher application.
 * This component sets up the basic HTML structure, including the header, main content area, and footer.
 * The `children` prop is used to render the main content of the application.
 */
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
          <h1>DreamCatcher</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 Dreamcatcher</p>
        </footer>
      </body>
    </html>
  );
}


