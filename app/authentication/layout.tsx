
export default function AuthenticationLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto max-w-6xl">
      {children}
    </main>
  );
}
