import { forwardRef } from "react"
import { Input as InputUI } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const Input = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <InputUI
      className={cn(
        "w-full",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

export { Input }