"use client"

import { GridLoader } from "react-spinners"

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-transparent top-0 left-0 w-full h-full flex items-center justify-center">
    <GridLoader className="" size={8} />
  </div>
  )
}

export default LoadingModal