import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useCollections = () => {
  const params = useParams();

  const collectionId = useMemo(() => {
    if (!params.collectionId) return "";

    return params.collectionId as string;
  }, [params?.collectionId])

  return useMemo(() => ({
    collectionId,
  }), [collectionId])
}