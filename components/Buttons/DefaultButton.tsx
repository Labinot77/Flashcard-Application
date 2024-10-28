"use client"


import { BarLoader } from 'react-spinners';
import { Button } from '../ui/button';

interface Props {
  className?: string
  onClick?: () => void
  pending: boolean
  type?: "submit" | "button" | "reset" | undefined
  children: React.ReactNode;
}

export const DefaultButton = ({ className, onClick, children, pending, type = "submit" }: Props) => {
  return (
    <>
    {pending ? (
      <Button
      disabled
      className={`${className}`}
      >
      <BarLoader />
      </Button>
    ) : (
      <Button
      type={type}
      className={`${className} `}
      onClick={onClick}
      >
        {children}
      </Button>
    )}
    </>
  )
}