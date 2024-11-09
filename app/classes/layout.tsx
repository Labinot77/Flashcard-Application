import Sidebar from "@/components/sidebar/Sidebar";
import { wait } from "@/lib/Misc";

export default function ClassesLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="mx-auto max-w-7xl h-full flex p-3">
    <Sidebar />
    <div className="sm:px-4 py-6 w-full">
    {children}
    </div>
  </main>
  );
}
