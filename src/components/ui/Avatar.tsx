import Image from "next/image";

export function Avatar({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt={"Avatar du joueur "}
      className="w-8 h-8 rounded-full"
    />
  );
}
