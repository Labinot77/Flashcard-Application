import Sidebar from "@/components/sidebar/Sidebar";

export default function SettingsLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto max-w-7xl h-full flex p-3">
      <Sidebar />
      <div className="p-4 w-full">
      {children}
      </div>
    </main>
  );
}
