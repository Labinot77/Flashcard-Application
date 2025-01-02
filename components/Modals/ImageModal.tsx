"use client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import Image from "next/image"

interface Props {
  src: string
  isOpen: boolean
  onClose: () => void
}

export const ImageModal = ({src, isOpen, onClose}: Props) => {
  if (!src) return null
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[70vw] sm:h-[70vh] max-w-[425px] max-h-[425px]">
        <Image 
        src={src}
        alt="Image"
        fill
        className="object-contain object-center"/>
      </DialogContent>
    </Dialog>
  )
}