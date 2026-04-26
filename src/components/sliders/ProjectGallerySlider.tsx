import Image from "next/image";
import BaseSlider from "./BaseSlider";
import {
  getImageUrl,
  getMediaById,
  WpProject,
} from "@/lib/wordpress";

type Props = {
  project: WpProject;
};

export default async function ProjectGallerySlider({
  project,
}: Props) {
  const acf = project.acf || {};

  const mediaItems = await Promise.all([
    getMediaById(acf.project_image_1),
    getMediaById(acf.project_image_2),
    getMediaById(acf.project_image_3),
    getMediaById(acf.project_image_4),
  ]);

  const validMedia = mediaItems.filter(
    (item): item is NonNullable<typeof item> =>
      item !== null && item !== undefined
  );

  const slides = validMedia
    .map((media, index) => {
      const imageUrl = getImageUrl(media, "full");

      if (!imageUrl) return null;

      return (
        <div
          key={media.id || index}
          className="relative h-[420px] w-full md:h-[560px]"
        >
          <Image
            src={imageUrl}
            alt={
              media.alt_text ||
              media.title?.rendered ||
              project.title?.rendered ||
              "Project Image"
            }
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      );
    })
    .filter(Boolean);

  if (!slides.length) return null;

  return (
    <section className="w-full overflow-hidden bg-black">
      <BaseSlider
        slides={slides}
        autoPlay={true}
        interval={3000}
        duration={900}
        perView={{
          mobile: 1,
          tablet: 1,
          desktop: 3,
        }}
        showArrows={true}
        showDots={true}
      />
    </section>
  );
}