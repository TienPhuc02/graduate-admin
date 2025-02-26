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
export async function fetchAssetsAsFile(url: string) {
  const response = await fetch(url)
  const fileName = url.split('/').pop()!
  const blob = await response.blob()
  return new File([blob], fileName, { type: blob.type })
}
