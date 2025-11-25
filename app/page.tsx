export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#f5f5f7",
      color: "#1c1c1e",
      fontSize: "2rem"
    }}>
      <h1>Karaoke Screen</h1>
      <p>Your session will appear here.</p>
      <p>Next step: Connect Supabase + build UI.</p>
    </div>
  );
}
