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
        <Header>
        </Header>
        <main>{children}</main>
        <Footer>
        </Footer>
      </body>
    </html>
  );
}