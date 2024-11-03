import Sidebar from "@/components/sidebar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomeLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollArea className="h-full w-full">
    <main className="mx-auto max-w-7xl h-full flex p-3">
      <Sidebar />
      <div className="px-4 py-6 w-full">
      {children}
      </div>
    </main>
    </ScrollArea>
  );
}
