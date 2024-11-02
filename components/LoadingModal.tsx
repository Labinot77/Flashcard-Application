"use client"

import { CgSpinner } from "react-icons/cg";

const LoadingModal = () => {
  return (
    <div className="inset-0 bg-transparent w-full h-full flex items-center justify-center" >
    <CgSpinner className="animate-spin dark:text-white text-black w-8 h-8" />
  </div>
  )
}

export default LoadingModal