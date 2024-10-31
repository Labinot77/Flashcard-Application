"use client"

import { useModal } from '@/context/ModalContext'
import React from 'react'
import ModalContainer from './ModalContainer'

const ModalContainerWrapper = () => {
  const { isOpen, closeModal, modalContent } = useModal()
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={closeModal}
    >
      {modalContent}
    </ModalContainer>
  )
}

export default ModalContainerWrapper