"use client";

import { DefaultInput } from "@/components/Inputs/DefaultInput";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { createClass } from "@/lib/actions/Classes";
import { ClassCreationValidation } from "@/lib/validations/Class";
import { DefaultButton } from "../Buttons/DefaultButton";
import { MdOutlinePeopleAlt } from "react-icons/md";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { GrayedButton } from "../Buttons/GrayedButton";

interface Props {
  users: User[];
  currentUser: User;
  children: React.ReactNode;
}

const CreateClassModal = ({ currentUser, users, children }: Props) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [open, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof ClassCreationValidation>>({
    resolver: zodResolver(ClassCreationValidation),
    defaultValues: {
      title: "",
      description: "",
      classUsers: [],
    },
  });

  const { isSubmitting } = form.formState;

  const filteredUsers = useMemo(
    () =>
      users
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
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Class</DialogTitle>
          <DialogDescription>
            Enter details and select users to add to this class.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full space-y-4"
            >
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <DefaultInput {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="classUsers"
                render={({ field }) => (
                  <FormItem>
                    <Command className="rounded-lg border bg-card/50">
                      {/* Not using CommandInput because it's doenst support onChange */}
                      <DefaultInput
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 w-full"
                      />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="py-2 pr-4 max-h-[15vh] overflow-y-auto">
                            {filteredUsers.map((user) => {
                              const isChecked = field.value.includes(user.id)

                              return (
                                <CommandItem
                                  key={user.id}
                                  className="flex items-center justify-between space-x-2 mb-2 cursor-pointer hover:bg-primary-foreground/40 rounded"
                                  onClick={() => {
                                    form.setValue(
                                      "classUsers",
                                      isChecked
                                        ? field.value.filter((id) => id !== user.id)
                                        : [...field.value, user.id],
                                      { shouldValidate: true }
                                    );
                                  }}
                                >
                                  <label
                                    htmlFor={user.id}
                                    className="flex items-center space-x-2 w-full cursor-pointer"
                                  >
                                    <MdOutlinePeopleAlt className="mr-2" />
                                    <p>{user.name} <span className="text-muted-foreground opacity-50">({user.email})</span></p>
                                  </label>

                                  <Checkbox
                                    id={user.id}
                                    value={user.id}
                                    checked={isChecked}
                                    onCheckedChange={(isChecked) => {
                                      form.setValue(
                                        "classUsers",
                                        isChecked
                                          ? [...field.value, user.id]
                                          : field.value.filter((id) => id !== user.id),
                                        { shouldValidate: true }
                                      );
                                    }}
                                  />
                                </CommandItem>
                              )
                            })}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </FormItem>
                )}
              />

              <DialogFooter>
                {form.watch("classUsers").length > 0 && form.watch("title").length > 2 ? (
                  <DefaultButton
                    disabledText="Creating"
                    pending={isSubmitting}
                    type="submit"
                  >
                    Create a Class
                  </DefaultButton>
                ) : (
                  <GrayedButton
                    pending={true}>
                    Create a Class
                  </GrayedButton>
                )}
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassModal;
