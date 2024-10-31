'use client'

import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { FaCommentDots, FaUsers, FaCog } from 'react-icons/fa';
import { useCollections } from "./useCollections";
import { IoHomeSharp } from "react-icons/io5";

export const useRoutes1 = () => {
  const pathname = usePathname();
  const { collectionId } = useCollections();

  const routes = useMemo(() => [
    {
      label: "Home",
      href: '/home',
      icon: IoHomeSharp, 
      active: pathname === '/home',
    },
    {
      label: "Collections",
      href: '/collections',
      icon: FaCommentDots, 
      active: pathname === '/collections'  || pathname === '/collections/edit' || pathname === "/collections/create" || !!collectionId,
    },
  ], [pathname, collectionId]);

  return routes;
};

export const useRoutes2 = () => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      label: "Classes",
      href: '/classes',
      icon: FaUsers,
      active: pathname === '/classes',
    },
    {
      label: "Create a Class",
      href: "#",
      icon: FaUsers,
      // active: pathname === '',
    },
  ], [pathname]);

  return routes;
};

export const useRoutes3 = () => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      label: "Settings",
      href: '/settings',
      icon: FaCog,
      active: pathname === '/settings',
    },
  ], [pathname]);

  return routes;
};
