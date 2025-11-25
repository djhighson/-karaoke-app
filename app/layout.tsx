import "../styles/globals.css";

export const metadata = {
  title: "Karaoke App",
  description: "Use your phone as a karaoke remote!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
