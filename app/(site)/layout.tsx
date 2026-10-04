import { Footer, MobileBar, Navbar } from "@/components/site/Chrome";
import { getSettings } from "@/lib/store";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const s = await getSettings();
  return (
    <>
      <Navbar phone={s.phone1} />
      <main className="flex-1">{children}</main>
      <Footer phone1={s.phone1} phone2={s.phone2} hours={s.hours} />
      <MobileBar phone={s.phone1} />
    </>
  );
}
