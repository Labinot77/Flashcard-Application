import { useParams, useRouter } from "next/navigation"
import { useMemo } from "react"

export const useClasses = () => {
  const router = useRouter();
  const params = useParams();

  const classId = useMemo(() => {
    if (!params.classId) return "";

    return params.classId as string;
  }, [params?.classId, router])

  return useMemo(() => ({
    classId,
  }), [classId])
}