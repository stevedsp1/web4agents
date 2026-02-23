import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navigation } from "./Navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 dark:border-gray-800 dark:bg-gray-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100 hover:text-accent dark:hover:text-accent transition-colors"
        >
          <Image
            src="/web4agents_logo.png"
            alt="Web4Agents"
            width={140}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center gap-1 md:gap-3">
          <Navigation />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
