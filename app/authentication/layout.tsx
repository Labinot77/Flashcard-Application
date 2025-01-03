export default function AuthenticationLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-[100vh] w-full p-40">
      <main className="mx-auto h-full w-full max-w-6xl">
        {children}
      </main>
    </div>
  );
}
