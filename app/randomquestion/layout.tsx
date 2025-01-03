import MobileSidebar from "@/components/sidebar/MobileSidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HomeLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto max-w-7xl h-full flex p-3">
      <Sidebar />
      <MobileSidebar />
      <ScrollArea className="h-full w-full">
        <div className="sm:px-4 py-6 w-full">
          {children}
        </div>
    </ScrollArea>
    </main>
  );
}
