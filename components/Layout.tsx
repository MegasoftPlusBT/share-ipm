import React, { ReactNode, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CategoriesAside from "./CategoriesAside";

type Props = {
  children: ReactNode[];
  media: any[];
  title?: string;
};

const Layout = ({
  children,
  media,
  title = "IPM - Indeks Privatnosti u Medijima",
}: Props) => {
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      const links = Array.from(
        document.querySelectorAll(".html-code-wrapper a")
      );
      links
        .filter((a) => !a.classList.contains("share-red"))
        .forEach((a) => {
          a.classList.add("share-red");
          (a as HTMLAnchorElement).target = "_blank";
        });
      Array.from(document.querySelectorAll("nav :not(.logo) a"))
        .filter((a) => (a as HTMLAnchorElement).href == location.toString())
        .forEach((a) => {
          (a as HTMLAnchorElement).style.textDecorationLine = "underline";
        });
    });
  });
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navbar media={media} />
        <div className="main-wrapper">
          <CategoriesAside />
          <main className="relative">{children}</main>
        </div>
        <Footer />

        {/* <script>
          {`window.addEventListener("DOMContentLoaded", () => {
        const links = Array.from(document.querySelectorAll(".html-code-wrapper a"));
        links.filter(a => !a.classList.contains("share-red"))
          .forEach(a => {
            a.classList.add("share-red");
            a.target = "_blank";
          });
        Array.from(document.querySelectorAll('nav :not(.logo) a'))
          .filter(a => a.href == location.toString())
          .forEach(a => {
            a.style.textDecorationLine = "underline";
          });
      });`}
        </script> */}
      </div>
    </>
  );
};

export default Layout;
