import { Footer } from "~/components/common/layout/footer";
import { Header } from "~/components/common/layout/header/header";

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full">{props.children}</main>
      <Footer />
    </>
  );
}
