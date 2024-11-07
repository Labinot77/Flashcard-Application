"use client";

import { DefaultInput } from "@/components/Inputs/DefaultInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"; // ShadCN Input
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { createClass } from "@/lib/actions/Classes";
import { ClassCreationValidation } from "@/lib/validations/Class";

interface Props {
  users: User[];
  currentUser: User;
  children: React.ReactNode;
}

const CreateClassModal = ({ currentUser, users, children }: Props) => {
  const router = useRouter();
  const [search , setSearch] = useState<string>("");
  const [open, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof ClassCreationValidation>>({
    resolver: zodResolver(ClassCreationValidation),
    defaultValues: {
      title: "",
      description: "",
      classUsers: [],
    },
  });

  console.log(currentUser)

  const filteredUsers = useMemo(
    () => users
        .filter((user) => user.id !== currentUser.id) 
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) 
        ),
    [users, search] 
  );

  const onSubmit = async (data: z.infer<typeof ClassCreationValidation>) => {
    try {
      const { classId, title } = await createClass(
        currentUser.id,
        data.classUsers, 
        data.title, 
        data.description || "" 
      );

      router.push(`/classes/${classId}`);
      router.refresh();

      toast({
        title: "Created Class",
        description: `"${title}" has been created`,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error creating class:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating the class.",
      });
    }
  };


  return (
    <Dialog open={open} onOpenChange={(prev) => setIsOpen(prev)}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Class</DialogTitle>
          <DialogDescription>Enter details and select users to add to this class.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-4">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <DefaultInput {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <DefaultInput {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Search and User Selection */}
              <FormField
                control={form.control}
                name="classUsers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Users</FormLabel>
                    
                    <Input
                      formNoValidate
                      placeholder="Search users..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="mb-10"
                    />

                    <ScrollArea className="py-2 pr-4 overflow-y-auto max-h-[14vh]">
                      {filteredUsers.length ? (
                        filteredUsers.map((user) => (
                          <div key={user.id} className="flex items-center space-x-2 mb-2">
                          <label
                            htmlFor={user.id}
                            className="w-full flex items-center hover:bg-primary-foreground/40 rounded px-2 py-1  cursor-pointer"
                          >
                            <Checkbox
                              id={user.id}
                              value={user.id}
                              onCheckedChange={(isChecked) => {
                                const userId = user.id;
                                form.setValue(
                                  "classUsers",
                                  isChecked
                                    ? [...field.value, userId]
                                    : field.value.filter((id) => id !== userId),
                                  { shouldValidate: true }
                                );
                              }}
                              checked={field.value.includes(user.id)}
                            />
                            <span className="ml-2">{user.name}</span>
                          </label>
                        </div>
                        ))
                      ) : (
                        <div className="flex justify-center items-center">
                          <p className="text-gray-500">No users found.</p>
                        </div>
                      )}
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <DialogFooter>
                <Button type="submit" variant="secondary">
                  Create a Class
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;
