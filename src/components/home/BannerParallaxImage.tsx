import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export function BannerParallaxImage({ src, alt }: Props) {
  return (
    <div className="relative h-[240px] w-full overflow-hidden bg-[#012555] md:h-[300px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_0%,rgba(1,37,85,0.65)_0%,transparent_75%)]" />
    </div>
  );
}
