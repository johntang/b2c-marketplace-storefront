import { Footer, Header } from "@/components/organisms";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="max-w-[1440px] mx-auto">{children}</div>
      <Footer />
    </>
  );
}
