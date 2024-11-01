"use client"

import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { GoPlus } from 'react-icons/go';
import { wait } from '@/lib/Misc';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewCollection = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await wait(Math.random() * 2000)
    setIsSubmitting(false)
    router.push("/collections/create")
  }

  return (
    <div className="min-w-[12rem] h-14 mt-2">
      <DefaultButton
        pending={isSubmitting}
        onClick={handleSubmit}
        className="w-full h-full rounded-md flex justify-center items-center"
      >
        <GoPlus size={20} />
      </DefaultButton>
    </div>
  );
};

export default NewCollection;
