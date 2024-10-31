"use client"

import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalContainer = ({ children, isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 shadow-xl rounded-xl">
      <DialogTitle hidden>ADSDA</DialogTitle>
        {children}
      </DialogContent>  
    </Dialog>
  )
}

export default ModalContainer