export const metadata = {
  title: "Karaoke",
  description: "Karaoke App"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
