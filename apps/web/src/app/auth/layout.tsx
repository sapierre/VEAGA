import { Footer } from "~/components/common/layout/footer";
import { Header } from "~/components/common/layout/header/header";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-[80rem] grow flex-col gap-10 p-6 sm:p-8 md:gap-14 md:p-10 lg:gap-16 lg:p-12">
      <Header />
      <div className="flex w-full grow items-center justify-center">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
