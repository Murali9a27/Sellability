import {
  getProjectBySlug,
  getMediaById,
  getImageUrl,
  stripHtml,
  getHighlights,
  formatPrice,
} from "@/lib/wordpress";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const acf = project.acf || {};

  const image = await getMediaById(acf.project_image_1);

  return (
    <main style={{ padding: "40px" }}>
      <h1>{project.title?.rendered}</h1>

      <p>{acf.project_tagline}</p>

      <br />

      {image && getImageUrl(image) && (
        <img
          src={getImageUrl(image) as string}
          alt={image.alt_text || image.title?.rendered || "Project image"}
          width={500}
        />
      )}

      <br />
      <br />

      <div>{stripHtml(project.content?.rendered || "")}</div>

      <br />

      {acf.starting_price && <p>Price: ₹ {formatPrice(acf.starting_price)}</p>}

      <br />

      <h3>Highlights</h3>

      <ul>
        {getHighlights(acf.project_highlights).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
