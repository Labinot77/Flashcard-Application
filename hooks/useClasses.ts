import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useClasses = () => {
  const params = useParams();

  const classId = useMemo(() => {
    if (!params.classId) return "";

    return params.classId as string;
  }, [params?.classId])

  return useMemo(() => ({
    classId,
  }), [classId])
}