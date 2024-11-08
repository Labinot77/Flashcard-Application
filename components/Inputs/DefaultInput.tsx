import { Input } from "../ui/input";
import { forwardRef } from "react";

interface Props {
  className?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
  value?: string;
}

export const DefaultInput = forwardRef<HTMLInputElement, Props>(
  ({ className, placeholder, onChange, value, ...props }, ref) => {
    return (
      <Input
        type="text"
        onChange={onChange}
        value={value}
        ref={ref} 
        placeholder={placeholder}
        className={`${className} bg-transparent text-foreground border-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 shadow-none`}
        {...props} 
      />
    );
  }
);

