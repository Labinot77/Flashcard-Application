import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MdOutlinePeopleAlt } from "react-icons/md"


const onSubmit = () => {
  console.log("adsadadda")
}

const CreateClassModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <div
        className={`flex items-center gap-x-3 rounded-md p-3 mt-2 leading-6 font-semibold text-gray-500 hover:bg-gray-100 cursor-pointer hover:bg-secondary-foreground/40`}
      >
        <MdOutlinePeopleAlt className="h-7 w-7 shrink-0" />
        <span>Create a Class</span>
      </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Class</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="title"
              defaultValue=""
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={() => onSubmit()} type="button" variant="secondary">
              Create a Class
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateClassModal