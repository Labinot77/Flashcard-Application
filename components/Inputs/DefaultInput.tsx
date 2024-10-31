import { Input } from "../ui/input";
import { forwardRef } from "react";

interface Props {
  className?: string;
  placeholder?: string;
}

export const DefaultInput = forwardRef<HTMLInputElement, Props>(
  ({ className, placeholder, ...props }, ref) => {
    return (
      <Input
        type="text"
        ref={ref} 
        placeholder={placeholder}
        className={`${className} bg-transparent text-foreground border-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 shadow-none`}
        {...props} 
      />
    );
  }
);

