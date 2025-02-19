export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: TMenuItem[]
): TMenuItem {
  return {
    key,
    icon,
    children,
    label
  } as TMenuItem
}
export async function fetchImageAsFile(imageUrl: string) {
  const response = await fetch(imageUrl)
  const fileName = imageUrl.split('/').pop()!
  const blob = await response.blob()
  return new File([blob], fileName, { type: blob.type })
}
