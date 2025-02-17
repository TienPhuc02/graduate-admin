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
