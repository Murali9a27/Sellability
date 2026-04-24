import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Sellability Frontend</h1>
      <br />

      <Link href="/projects">View Projects</Link>
    </main>
  );
}



