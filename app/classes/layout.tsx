import Sidebar from "@/components/sidebar/Sidebar";
import { wait } from "@/lib/Misc";

export default async function ClassesLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // await wait(5000)
  return (
    <main className="mx-auto max-w-7xl h-full flex p-3">
    <Sidebar />
    <div className="p-4 w-full">
    {children}
    </div>
  </main>
  );
}
