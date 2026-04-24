import Link from "next/link";
import {
  getProjects,
  stripHtml,
  formatPrice,
} from "@/lib/wordpress";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main style={{ padding: "40px" }}>
      <h1>Projects</h1>
      <br />

      {projects.map((project) => {
        const acf = project.acf || {};

        return (
          <div
            key={project.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <Link href={`/projects/${project.slug}`}>
              <h2>{project.title?.rendered}</h2>
            </Link>

            <p>{stripHtml(project.excerpt?.rendered || "")}</p>

            {acf.starting_price && (
              <p>₹ {formatPrice(acf.starting_price)}</p>
            )}
          </div>
        );
      })}
    </main>
  );
}