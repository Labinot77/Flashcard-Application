'use client'

import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { FaCommentDots, FaUsers, FaCog } from 'react-icons/fa';
import { useCollections } from "./useCollections";

export const useRoutes1 = () => {
  const pathname = usePathname();
  const { collectionId } = useCollections();

  const routes = useMemo(() => [
    {
      label: "Collections",
      href: '/collections',
      icon: FaCommentDots, 
      active: pathname === '/collections' || !!collectionId,
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
      active: pathname === '/classes',
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
