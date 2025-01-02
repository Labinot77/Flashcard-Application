export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const noSpaces = (str: string) => {
  if (!str.includes(" ")) {
    return true;
  } else {
    return false;
  }
}

export const getMostRecentDate = (createdAt: Date, updatedAt: Date) => {
  if (createdAt.getTime() === updatedAt.getTime()) {
    return `Създадено: ${createdAt.toLocaleDateString()}`
  } else if (updatedAt > createdAt) {
    return `Обновено: ${updatedAt.toLocaleDateString()}`
  } else {
    return `Създадено: ${createdAt.toLocaleDateString()}`
  }
};