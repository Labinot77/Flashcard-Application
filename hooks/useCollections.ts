import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useCollections = () => {
  const params = useParams();

  const collectionId = useMemo(() => {
    if (!params.id) return "";

    return params.id as string;
  }, [params?.id])

  return useMemo(() => ({
    collectionId,
  }), [collectionId])
}