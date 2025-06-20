import { LuArrowUp } from "react-icons/lu";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  // <footer className="block w-full grid-cols-[1fr_45px]">
  const t = await getTranslations("footer");
  return (
    <footer className="hidden hd:block w-full">
      {/* <div className="w-full bg-[var(--primary)]">
        <div className="w-[var(--content-width)] m-auto flex gap-20 2xl:gap-50 py-12">
          <div className="h-full flex flex-col gap-4">
              <Logo className="max-w-80" />
              <p className="hidden 3xl:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex flex-cols gap-6">
                <LuFacebook />
                <LuTwitter />
                <LuLinkedin />
                <LuInstagram />
              </div>
          </div>
          <div className="h-full flex flex-col gap-2 text-sm">
            <h4 className="mb-2 text-lg font-semibold">Catalog</h4>
            <a>Weights</a>
            <a>Dumbbells</a>
            <a>Barbells</a>
            <a>Cardio</a>
          </div>
          <div className="hidden h-full lg:flex flex-col gap-2 text-sm">
            <h4 className="mb-2 text-lg font-semibold">Catalog</h4>
            <a>Weights</a>
            <a>Dumbbells</a>
            <a>Barbells</a>
            <a>Cardio</a>
          </div>
          <div className="hidden h-full lg:flex flex-col gap-2 text-sm">
            <h4 className="mb-2 text-lg font-semibold">Catalog</h4>
            <a>Weights</a>
            <a>Dumbbells</a>
            <a>Barbells</a>
            <a>Cardio</a>
          </div>
        </div>
      </div> */}
      <div className="w-full bg-[var(--primary)] m-0 p-0">
        <div className="lg:w-[var(--content-width)] m-auto flex justify-center lg:justify-between md:px-10 2xl:px-40 py-4 text-sm">
          <p>2025 Ironpro.Club</p>
          <div className="hidden lg:flex">
            {/* <img src="/images/knet.svg" /> */}
          </div>
          {/* Scroll to top */}
          <a href="#" className="hidden lg:flex capitalize justify-center items-center gap-2">
            {t("scrollToTop")}
            <LuArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
