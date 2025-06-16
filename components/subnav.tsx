'use client';
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function SubNav({ children, fixed, className = "" }: { children?: React.ReactNode, fixed?: boolean, className?: string }) {
  const subNavBarRef = useRef<HTMLDivElement>(null);
  const location = usePathname();

  // useEffect(() => {
  //   if (!fixed) return;
  //   const handleScroll = () => {
  //     if (subNavBarRef.current) {
  //       const subBarNavY = subNavBarRef.current?.parentElement?.offsetTop || 0;
  //       console.log(subBarNavY);
  //       if (window.scrollY > subBarNavY) {
  //         subNavBarRef.current.classList.add("fixed", "top-0", "bg-slate-600!", "z-90");
  //         subNavBarRef.current.children[0].classList.add("m-auto", "lg:w-[var(--content-width)]");
  //       } else {
  //         subNavBarRef.current.classList.remove("fixed", "top-0", "bg-slate-600!", "z-90");
  //         subNavBarRef.current.children[0].classList.remove("m-auto", "lg:w-[var(--content-width)]");
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [ subNavBarRef ]);

  return (
    <div className={`h-[75px] m-0 p-0 ${location == '/' ? 'block' : 'hidden'} ${className}`}>
      <div ref={subNavBarRef} className="left-0 w-full">
        <div id="portal-subnav" className="flex justify-start">
          { children }
        </div>
      </div>
    </div>
  )
}

export function SubNavPortal({ children }: { children: React.ReactNode }) {
  const [container, setContainer] = useState<any>(null);
  
  useEffect(() => {
    if (!container) {
      setContainer(document.getElementById("portal-subnav"));
    }
  }, []);
  if (!container) return null;
  return createPortal(children, container);
};

type NavItemProps = {
  label?: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function SubNavItem({ children, label = "", href, onClick, active = false, className = "" }: NavItemProps) {
  return (
    <a href={href} className={`hover:bg-[var(--color-nav-item-hover)] py-6 px-5 border-2 border-transparent cursor-pointer ${active ? "border-b-white" : ""} ${className}`} onClick={onClick}>
      {label}
      {children}
    </a>
  );
}
