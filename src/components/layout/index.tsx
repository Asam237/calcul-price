import type { ReactNode } from "react";
import { Footer } from "../Footer";
import cn from "clsx";
import { EuclidUiDisplay } from "@/lib/fonts";
import Head from "next/head";

interface DefaultLayoutProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Calcul du prix total</title>
      </Head>
      <div className={cn(EuclidUiDisplay.variable)}>
        <div className="flex justify-center items-center mt-10">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};
