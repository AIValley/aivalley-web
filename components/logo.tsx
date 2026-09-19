import Image from "next/image";

export function Logo() {
  return (
    <span className="relative block h-[30px] w-[120px]">
      <Image
        className="site-logo object-contain"
        src="/logo-full.png"
        alt="AIValley - Public AI Directory"
        fill
        sizes="120px"
        priority
      />
    </span>
  );
}
