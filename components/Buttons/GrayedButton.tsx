"use client"


import { Button } from '../ui/button';

interface Props {
  className?: string;
  onClick?: () => void;
  pending: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  children: React.ReactNode;
}

export const GrayedButton = ({ 
  className, 
  onClick, 
  children, 
  pending, 
  variant = "default", 
  type = "submit",
   }: Props) => {
  return (
    <>
    {pending ? (
      <Button
      disabled
      className={`${className} bg-button`}
      >
        {children}
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