
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getContent } from "@/lib/content";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer content={content} />
    </>
  );
}
