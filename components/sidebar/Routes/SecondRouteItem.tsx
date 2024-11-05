"use client";

import { useClasses } from "@/hooks/useClasses";
import { UserClassesExtended } from "@/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePeopleAlt } from "react-icons/md";

interface Props {
  userClasses: UserClassesExtended[];
}

const SecondRouteItem = ({ userClasses }: Props) => {
  const params = useParams();
  const { classId } = useClasses();

  return (
    <>
      {userClasses && userClasses.length > 0 ? (
        <>
          <h1 className="ml-2">Your Classes</h1>
          {userClasses.map((item) => {
            const activeLink = classId === item.class.id ? "bg-secondary-foreground/30" : "";

            return (
              <Link
                key={item.class.id}
                href={`/classes/${item.class.id}`}
                className={`${activeLink} flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:bg-secondary-foreground/40`}
              >
                <FaUsers size={24} />
                <span>{item.class.title}</span>
              </Link>
            );
          })}
        </>
      ) : (
        <div
          className={`flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:cursor-not-allowed bg-secondary-foreground/40`}
        >
          <FaUsers size={24} />
          <span>No class activity</span>
        </div>)}

      <div
        className={`flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:bg-secondary-foreground/40`}
      >
        <MdOutlinePeopleAlt className="h-7 w-7 shrink-0" />
        <span>Create a Class</span>
      </div>
    </>
  );
};

export default SecondRouteItem;
