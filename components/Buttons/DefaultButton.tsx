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
  disabledText?: string;
  children: React.ReactNode;
}

export const DefaultButton = ({ 
  className, 
  onClick, 
  children, 
  pending, 
  variant = "default", 
  type = "submit",
  disabledText = "Saving" }: Props) => {
  return (
    <>
    {pending ? (
      <Button
      disabled
      className={`${className} bg-button`}
      >
        <h1 className='text-black dark:text-white inline-flex items-center justify-center gap-2'>
          {disabledText} 
          <CgSpinner className="animate-spin  w-10 h-10" /></h1>
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