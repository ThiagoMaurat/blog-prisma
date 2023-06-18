import Provider from "./Provider";
import "./global.css";
import { Montserrat } from "next/font/google";

const montSerrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <title>Thiago - blog</title>
      </head>

      <body className={`${montSerrat.variable} font-primary`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
