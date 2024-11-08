"use client"


import { PulseLoader } from 'react-spinners';
import { Button } from '../ui/button';
import { CgSpinner } from 'react-icons/cg';

interface Props {
  className?: string;
  onClick?: () => void;
  pending: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  children: React.ReactNode;
}

export const DefaultButton = ({ className, onClick, children, pending, variant = "default", type = "submit" }: Props) => {
  return (
    <>
    {pending ? (
      <Button
      disabled
      className={`${className} bg-button`}
      >
         <CgSpinner className="animate-spin dark:text-white text-black w-10 h-10" />
      </Button>
    ) : (
      <Button
      type={type}
      variant={variant}
      className={`${className}`}
      onClick={onClick}
      >
        {children}
      </Button>
    )}
    </>
  )
}