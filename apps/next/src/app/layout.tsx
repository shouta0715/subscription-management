import "@/styles/globals.css";

function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html suppressHydrationWarning lang="ja">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
