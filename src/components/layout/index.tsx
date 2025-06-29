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
      <div className={cn(EuclidUiDisplay.variable, "h-screen flex flex-col overflow-hidden")}>
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        <footer className="flex-shrink-0 flex justify-center items-center py-2 bg-black/10 backdrop-blur-sm">
          <p className="text-xs text-white/70">© {new Date().getFullYear()} - Organisation Internationale pour les Migrations</p>
        </footer>
      </div>
    </>
  );
};