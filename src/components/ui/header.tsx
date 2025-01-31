import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <Image
          src="/DartKeeper_Logo_dartkeeper.svg"
          alt="DartKeeper"
          width={50}
          height={50}
        />

        <h1 className="text-4xl font-heading  text-center text-primary tracking-tight">
          DartKeeper
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
