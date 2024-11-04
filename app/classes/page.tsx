// "use client";

import { Button } from "@/components/ui/button";
import { getCurrentSessionUserData } from "@/lib/actions/User";

const Page = async () => {
  const currentUser = await getCurrentSessionUserData();
  const classes = currentUser?.classes;
  console.log(classes)



   // Check if `classes` is defined and has any data before attempting to map
   if (!classes || classes.length === 0) {
     return (
       <main className="flex flex-col items-center justify-center h-full gap-5">
         <h1 className="text-4xl">No Existing Classes</h1>
         {/* <NewCollection /> */}
       </main>
     );
   }

  // const handleSubmit = async (title, members, description, userId) => {
  //   try {
  //     const response = await fetch("/api/classes/addClass", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title, members, description, userId }),
  //     });

  //     const data = await response.json();
  //     console.log(data); // Log the response from the server

  //     if (!response.ok) {
  //       console.error("Error:", data);
  //     }
  //   } catch (error) {
  //     console.error("Error in handleSubmit:", error);
  //   }
  // };

  return (
    <div className="w-full">
      {/* <Button
        onClick={() =>
          handleSubmit(
            "Test",
            ["671dff41bce87b5c577f50d9", "671dff1bbce87b5c577f50d8"],
            "Test",
            "67235069f32f6f157be6687d"
          )
        }
      >
        dasdaaad
      </Button> */}
     <div className="w-full">
      {classes.map((classData) => (
        <div key={classData.id}>
          <h1>{classData.title}</h1>
          <p>{classData.description}</p>
          <ul>
            {classData.users.map((user) => (
              <li key={user.id}>{user.name}</li>              
            ))}
          </ul>
        </div>
      ))} 
    </div>
      </div>
  );
};

export default Page;
