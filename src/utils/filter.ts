export const createChoiceSet = <T extends object, U extends keyof T>(
  items: T[],
  key: T[U] extends string[] | null ? U : never
) =>
  [...new Set(items.flatMap((item) => item[key] as string[] | null))].reduce<
    { label: string; value: string }[]
  >((acc, next) => {
    if (!next) {
      return acc
    }
    acc.push({ label: next, value: next })
    return acc
  }, [])
