'use client'

import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { FaUsers, FaCog } from 'react-icons/fa';
import { useCollections } from "./useCollections";
import { PiFolderOpenThin } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { CiSettings } from "react-icons/ci";

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

export const useRoutes2 = () => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      label: "Classes",
      href: '/classes',
      icon: MdOutlinePeopleAlt,
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
      icon: CiSettings,
      active: pathname === '/settings',
    },
  ], [pathname]);

  return routes;
};
