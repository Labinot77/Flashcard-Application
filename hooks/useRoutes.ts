'use client'

import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { useCollections } from "./useCollections";
import { PiFolderOpenThin } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";

export const useRoutes1 = () => {
  const pathname = usePathname();
  const { collectionId } = useCollections();

  const routes = useMemo(() => [
    {
      label: "Home",
      href: '/home',
      icon: AiOutlineHome, 
      active: pathname === '/home',
    },
    {
      label: "Your library",
      href: '/collections',
      icon: PiFolderOpenThin, 
      active: pathname === '/collections'  || pathname === '/collections/edit' || pathname === "/collections/create" || !!collectionId,
    },
  ], [pathname, collectionId]);

  return routes;
};

