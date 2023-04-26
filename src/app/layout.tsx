import Provider from "./Provider";

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
