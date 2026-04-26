import Image from "next/image";
import BaseSlider from "./BaseSlider";

const logos = [
  { name: "Logo 1", src: "/images/clients/Bishnoi-Kalamkar.png" },
  { name: "Logo 2", src: "/images/clients/Kakkad-Group.png" },
  { name: "Logo 3", src: "/images/clients/Kunal_Group.png" },
  { name: "Logo 4", src: "/images/clients/MB.png" },
  { name: "Logo 5", src: "/images/clients/pride.png" },
  { name: "Logo 6", src: "/images/clients/SSD-Group.png" },
  { name: "Logo 7", src: "/images/clients/Utsav-Homes.png" },
];

export default function LogoSlider() {
  const slides = logos.map((logo) => (
    <div
      key={logo.name}
      className="flex h-24 items-center justify-center px-6"
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={180}
        height={80}
        className="h-auto max-h-16 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  ));

  return (
    <section className="w-full overflow-hidden bg-black py-10">
      <div className="mx-auto max-w-7xl px-6">
        <BaseSlider
          slides={slides}
          autoPlay={true}
          interval={3000}
          duration={1000}
          perView={{ mobile: 2, tablet: 4, desktop: 6 }}
          showArrows={false}
          showDots={false}
          className="w-full"
        />
      </div>
    </section>
  );
}