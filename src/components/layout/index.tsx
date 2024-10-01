import type { ReactNode } from "react";
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
        <title>CAN_IMM - UK  |  Price Calculator</title>
      </Head>
      <div className={cn(EuclidUiDisplay.variable)}>
        <div className="flex justify-center items-center mt-10">
          <main>{children}</main>
        </div>
      </div>
      <footer className="flex justify-center items-center pt-4 pb-6">
        <p className="text-[14px] text-gray-300">Copyright © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
};
