"use client"


import { BarLoader } from 'react-spinners';
import { Button } from '../ui/button';

interface Props {
  className?: string
  onClick?: () => void
  pending: boolean
  children: React.ReactNode
}

export const DefaultButton = ({ className, onClick, children, pending}: Props) => {
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
      type="submit"
      className={`${className} `}
      onClick={onClick}
      >
        {children}
      </Button>
    )}
    </>
  )
}