"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useClasses } from "@/hooks/useClasses";
import { UserDataExtendedToClassDataExtended } from "@/types/types";
import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import CreateClassModal from "../../Modals/CreateClassModal";
import { User } from "@prisma/client";
import { MdOutlinePeopleAlt } from "react-icons/md";

interface Props {
  users: User[];
  currentUser: UserDataExtendedToClassDataExtended;
}

const SecondRouteItem = ({ users, currentUser }: Props) => {
  const userClasses = currentUser.classUsers;
  const { classId } = useClasses();

  return (
    <>
      {userClasses && userClasses.length > 0 ? (
        <>
          <h1 className="ml-2">Your Classes</h1>
          <ScrollArea className="w-full pr-4 overflow-y-auto max-h-[11rem]">
          {userClasses.map((item) => {
            const activeLink = (classId === item.class.id ? "bg-secondary-foreground/30" : "");
            const slicedTitle = item.class.title.length > 17
            ? `${item.class.title.slice(0, 17)}...`
            : `${item.class.title}`;

            return (
              <Link
                key={item.class.id}
                href={`/classes/${item.class.id}`}
                className={`${activeLink} flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:bg-gray-100 hover:bg-secondary-foreground/40`}
              >
                <FaUsers size={24} />
                <span>{slicedTitle}</span>
              </Link>
            );
          })}
          </ScrollArea>
        </>
      ) : (
        <div
          className={`flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:cursor-not-allowed bg-secondary-foreground/40`}
        >
          <FaUsers size={24} />
          <span>No class activity</span>
        </div>
      )}

      <CreateClassModal currentUser={currentUser} users={users}>
        <div className="flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer hover:bg-secondary-foreground/40">
          <MdOutlinePeopleAlt className="h-7 w-7 shrink-0" />
          <span>Create a Class</span>
        </div>
      </CreateClassModal>
    </>
  );
};

export default SecondRouteItem;
