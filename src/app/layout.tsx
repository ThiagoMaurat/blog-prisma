import Provider from "./Provider";
import "./global.css";

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

      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
