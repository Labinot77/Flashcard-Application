"use client";

import { Button } from "@/components/ui/button";
import { getCurrentSessionUserData } from "@/lib/actions/User";
import { useState } from "react";

const Page = () => {
  // const currentUser = await getCurrentSessionUserData();
  // const classes = currentUser?.classUsers

  const handleAddClass = async () => {
    const title = "New Test Class";
    const description = "This is a test class created via button click.";
    const members = ["671dff1bbce87b5c577f50d8", "671e0053bce87b5c577f50da"]; // Replace with actual member IDs
    const userId = "67235069f32f6f157be6687d"
    // const userId = currentUser?.id; // Assuming this is the creator's ID

    // if (!userId) {
    //   console.error("Current user ID is not available.");
    //   return;
    // }

    try {
      const response = await fetch("/api/classes/addClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, members, userId }),
      });

      const data = await response.json();
      console.log("Class created:", data); // Log the response from the server

      if (!response.ok) {
        console.error("Error creating class:", data);
      } else {
        // Optionally: refresh data here to show the new class without reloading the page
      }
    } catch (error) {
      console.error("Error in handleAddClass:", error);
    }
  };

  // if (!classes || classes.length === 0) {
  //   return (
  //     <main className="flex flex-col items-center justify-center h-full gap-5">
  //       <h1 className="text-4xl">No Existing Classes</h1>
  //       <Button onClick={handleAddClass}>Add New Class</Button>
  //     </main>
  //   );
  // }

  return (
    <div className="w-full">
      <Button onClick={handleAddClass} className="mb-5">
        Add New Class
      </Button>
      <div>
        {/* {classes.map((classData) => (
          <div key={classData.id}>
            <h1>{classData}</h1>
            <p>{classData.description}</p>
            <ul>
              <p>Creator: {classData.creatorId}</p>
              {classData.users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Page;
