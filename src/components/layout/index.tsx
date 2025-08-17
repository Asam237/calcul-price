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
        <title>Price Calculator | IOM</title>
      </Head>
      <div
        className={cn(EuclidUiDisplay.variable, "min-h-screen flex flex-col")}
      >
        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>
        <footer className="flex justify-center items-center py-4 bg-black/10 backdrop-blur-sm mt-10">
          <p className="text-sm text-white/70 text-center">
            Copyright © {new Date().getFullYear()} - International Organization
            for Migration
          </p>
        </footer>
      </div>
    </>
  );
};
