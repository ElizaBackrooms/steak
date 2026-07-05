import type { ReactNode } from "react";
import Image from "next/image";

type SectionBackdropProps = {
  image: string;
  alt?: string;
  overlay?: "dark" | "darker" | "warm" | "ember";
  fixed?: boolean;
  children: ReactNode;
  id?: string;
  className?: string;
};

const OVERLAYS = {
  dark: "from-steak-950/92 via-steak-950/85 to-steak-950/95",
  darker: "from-steak-950/95 via-steak-950/90 to-steak-950/98",
  warm: "from-steak-950/88 via-steak-900/80 to-steak-950/92",
  ember: "from-steak-950/90 via-steak-950/75 to-steak-950/95",
} as const;

export default function SectionBackdrop({
  image,
  alt = "",
  overlay = "dark",
  fixed = false,
  children,
  id,
  className = "",
}: SectionBackdropProps) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      <div className={`${fixed ? "fixed" : "absolute"} inset-0 -z-10`}>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={image.includes("hero")}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${OVERLAYS[overlay]}`} />
        <div className="ranch-noise pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
