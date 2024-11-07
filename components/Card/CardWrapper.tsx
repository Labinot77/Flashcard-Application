"use client"

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CardWrapper = ({ children, className}: Props) => {
  return (
    <main className={`${className} p-1 rounded-md`}>
      {children}
    </main>
  )
}

export default CardWrapper