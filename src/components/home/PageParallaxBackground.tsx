import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
}

export function PageParallaxBackground({ src, alt = "" }: Props) {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-[#012555]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(186,136,49,0.12)_0%,_transparent_55%)]" />
    </div>
  );
}
