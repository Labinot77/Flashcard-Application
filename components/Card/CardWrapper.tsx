"use client"

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CardWrapper = ({ children, className}: Props) => {
  return (
    <main className={`${className} p-1 rounded-md bg-neutral-300`}>
      {children}
    </main>
  )
}

export default CardWrapper