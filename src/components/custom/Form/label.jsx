import { Label as LabelUI } from "@/components/ui/label"

export function Label ({
  value,
  isRequired,
  ...props
}) {
  return (
    <LabelUI
      {...props}
    >
      {value}
      {isRequired && <span className="text-danger ms-2">*</span>}
    </LabelUI>
  )
}