
/**
 * The root layout component for the Dreamcatcher application.
 * This component sets up the basic HTML structure, including the header, main content area, and footer.
 * The `children` prop is used to render the main content of the application.
 */
import './globals.css';
"use Client";

import './globals.css';
import Header from './components/Header/Header'; // Correct path to import Header
import Footer from './components/Footer/Footer'; // Correct path to import Header




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
        <Footer>
        </Footer>
      </body>
    </html>
  );
}


