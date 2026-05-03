import Image from "next/image";

const stats = [
  {
    value: "18",
    suffix: "L+",
    label: "SQ. FT SOLD OUT",
    highlight: false,
  },
  {
    value: "1,800",
    suffix: "+",
    label: "UNITS SOLD OUT",
    highlight: false,
  },
  {
    value: "22",
    suffix: "K+",
    label: "WALK-INS",
    highlight: false,
  },
  {
    value: "2,000",
    suffix: "CR",
    label: "REVENUE GENERATED",
    highlight: true,
  },
];

export default function ImpactMapSection() {
  return (
    <section className="w-full bg-[#f5f5f5] py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[42%_58%]">
        {/* Stats */}
        <div className="grid grid-cols-2 border border-[#d9d9d9]">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`min-h-[155px] p-7 ${
                item.highlight
                  ? "bg-[#e23424] text-white"
                  : "bg-[#f5f5f5] text-[#e23424]"
              } ${
                index === 0 || index === 1
                  ? "border-b border-[#d9d9d9]"
                  : ""
              } ${
                index === 0 || index === 2
                  ? "border-r border-[#d9d9d9]"
                  : ""
              }`}
            >
              <div className="flex items-end gap-1">
                <span className="text-5xl font-bold leading-none tracking-tight md:text-6xl">
                  {item.value}
                </span>
                <span
                  className={`mb-1 text-2xl font-bold ${
                    item.highlight ? "text-white" : "text-[#25314d]"
                  }`}
                >
                  {item.suffix}
                </span>
              </div>

              <p
                className={`mt-7 text-sm font-medium uppercase tracking-[0.16em] md:text-base ${
                  item.highlight ? "text-white" : "text-[#25314d]"
                }`}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Map Image */}
        <div className="relative min-h-[430px] w-full">
          <Image
            src="/images/sections/pune-map.png"
            alt="Sellability impact map"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}