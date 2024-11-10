"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  users: User[];
}

const AvatarGroup = ({ users }: Props) => {
  const slicedUsers = users?.slice(0, 3);
  const remainingUsersCount = users.length - 3;

  const positionMap = {
    0: "z-10 left-0",
    1: "z-20 left-[18px]",
    2: "z-30 left-[36px]", 
  };

  return (
    <div className="flex items-center">
      <div className="relative w-16 h-8 mb-4 mt-4 flex">
        {slicedUsers?.map((user, index) => (
          <div
            key={user.id}
            className={`absolute inline-block rounded-full border-2 overflow-hidden h-10 w-10 
              ${positionMap[index as keyof typeof positionMap]}
              `}
          >
            <Image
              alt="Avatar"
              fill
              src={user.image as string}
            />
          </div>
        ))}

      </div>

      {remainingUsersCount > 0 && (
        <div className="ml-4 mt-2 text-gray-500 flex items-center">
          +{remainingUsersCount} more
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
