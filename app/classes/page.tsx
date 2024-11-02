// "use client";

import { Button } from "@/components/ui/button";
import { getCurrentSessionUserData } from "@/lib/actions/User";

const Page = async () => {
  const classes = await getCurrentSessionUserData();


  if (!classes) {
    return <div>Loading...</div>;
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
            ["671dff41bce87b5c577f50d9", "67235069f32f6f157be6687d"],
            "Test",
            "671e0053bce87b5c577f50da"
          )
        }
      >
        dasdaaad
      </Button> */}
      </div>
  );
};

export default Page;
