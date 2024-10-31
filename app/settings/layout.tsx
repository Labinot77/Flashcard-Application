import Sidebar from "@/components/sidebar/Sidebar";

export default function SettingsLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto max-w-7xl h-full flex p-3">
      <Sidebar />
      <div className="px-4 py-6 w-full">
      {children}
      </div>
    </main>
  );
}
