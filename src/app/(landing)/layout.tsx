import type { Metadata } from "next";

import { Footer, Header } from "@/app/modules/Home";

import { Poppins, Montserrat } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--secondary-font",
});

import "../styles/global.scss";
import "normalize.css/normalize.css";
import classNames from "classnames";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "NYC Car Service | JFK, Newark | LG AirportTransportation",
  description: "Enjoy an outstanding ridesharing experience. We’ve got you covered with reliable airport pick-ups and drop-offs that keep it simple. Travel smart and hassle-free with every ride.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={classNames(poppins.className, montserrat.className)}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
