import { forwardRef } from "react"
import CurrencyInput from "react-currency-input-field"
import { cn } from "@/lib/utils"

interface CurrencyInputFieldProps {
  name: string
  value?: string
  onValueChange?: (value?: string, name?: string) => void
  placeholder?: string
  className?: string
  prefix?: string
  disabled?: boolean
}

const CurrencyInputField = forwardRef<
  HTMLInputElement,
  CurrencyInputFieldProps
>(
  (
    {
      name,
      value,
      onValueChange,
      placeholder,
      className,
      prefix = "$",
      disabled,
    },
    ref
  ) => {
    return (
      <CurrencyInput
        id={name}
        name={name}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onValueChange}
        prefix={prefix}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          className
        )}
        ref={ref}
      />
    )
  }
)

CurrencyInputField.displayName = "CurrencyInputField"

export default CurrencyInputField
