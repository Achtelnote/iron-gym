'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuChevronLeft, LuLanguages, LuMenu, LuShoppingCart } from "react-icons/lu";
import Logo from "./logo";
import Link from "next/link";
import CartModal from "./cart/cart-modal";
import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Typography } from "./typography";
import { useGetAllSearchParams } from "@/app/hooks/searchParams";

export default function NavBar({ className }: { className: string}) {
  const currentPath = usePathname();
  const navBarRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("NavBar");

  useEffect(() => {
    const handleScroll = () => {
      if (navBarRef.current) {
        const subBarNavY = navBarRef.current?.parentElement?.offsetTop || 0;
        if (window.scrollY > subBarNavY) {
          navBarRef.current.classList.add("fixed", "top-0", "bg-[var(--primary)]!", "z-10");
          navBarRef.current.children[navBarRef.current.children.length - 1].classList.add("lg:hidden!");
        } else {
          navBarRef.current.classList.remove("fixed", "top-0", "bg-[var(--primary)]!", "z-10");
          navBarRef.current.children[navBarRef.current.children.length - 1].classList.remove("lg:hidden!");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ navBarRef ]);

  return (
    <nav ref={navBarRef} className={`z-2 ${className}`}>
      <div className="lg:w-[var(--content-width)] flex justify-between items-center sm:m-auto text-white">
        <MenuButton />
        <div className="hidden lg:flex">
          <NavItem label={t("home")} active={currentPath == '/'} href="/" />
          <NavItem label={t("about")} active={currentPath == '/#about'} href="#about" />
          {/* <NavItem label={t("contact")} active={currentPath == '/contact'} /> */}
        </div>
        <div className="absolute left-0 right-0 hidden sm:flex justify-center items-center pointer-events-none">
          <Logo className="max-w-25 lg:max-w-40 2xl:max-w-auto" />
        </div>
        <div className="flex">
          <LanguageSelect />
          <NavCart />
        </div>
      </div>
      <div className="hidden lg:block top-[75px] max-h-[0.1rem] w-[var(--content-width)] m-auto size-18 rounded-full bg-linear-50 from-transparent from-5% via-white to-transparent to-95%"></div>
    </nav>
  );
}

function LanguageSelect({ className }: { className?: string; }) {
  const location = usePathname();
  const { params, queryString } = useGetAllSearchParams();
  const newLocation = (locale: string) => {
    const newLoc = location.replace(/\/[a-z]{2}\/?/, `/${locale}/`);
    return `${newLoc}?${queryString}`;
  };
  const t = useTranslations("NavBar");
  const currentLocale = useLocale();
  const ar = t("arabic");
  const en = t("english");

  return (
    <div className="language-button w-full m-0 p-0">
      <NavItem icon={<LuLanguages size={20} />} className={`block ${className}`} />
      <div className="language-menu absolute hidden m-0 p-0 flex flex-col bg-[var(--primary)] text-center">
        <NavItem label={en} href={newLocation('en')} />
        <NavItem label={ar} href={newLocation('ar')} className={``} />
      </div>
    </div>
  );
}

function NavCart() {
  // TODO: Implement cart functionality
  // Pressing cart icon should open a cart popup/modal
  // For now, it just redirects to the cart page
  return (
    <div className="relative hover:*:grid">
      <NavItem href="/cart" icon={<LuShoppingCart size={18} />} className="grid p-6!" />
      <CartModal />
    </div>
  );
}

function MenuButton({ onClick }: { onClick?: () => void; }) {
  const location = usePathname();
  const nav = useRouter();

  if (location !== '/') {
    return (
      <button className="lg:hidden p-6 hd:hover:bg-[var(--color-nav-item-hover)] cursor-pointer" onClick={nav.back}>
        <LuChevronLeft size={24} />
      </button>
    )
  }

  return (
    <Link href="#" className="lg:hidden py-6 px-4 hover:bg-[var(--color-nav-item-hover)]" onClick={onClick}>
      <LuMenu size={24} />
    </Link>
  );
}

type NavItemProps = {
  href?: string;
  label?: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

function NavItem({
  href = "#",
  label = "",
  icon,
  active = false,
  onClick,
  className = "",
}: NavItemProps) {
  // ${active ? "border-b-white" : ""}
  return (
    <Link href={href} className={`py-6 px-2 2xl:py-6 2xl:px-4 text-sm 2xl:text-base border-2 hover:bg-[var(--color-nav-item-hover)]/30 border-transparent ${active ? "underline underline-offset-8" : ""} ${className}`} onClick={onClick}>
      {icon}
      <Typography uppercase>
        {label}
      </Typography>
    </Link>
  );
}
