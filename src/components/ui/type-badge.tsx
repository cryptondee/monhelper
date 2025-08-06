import * as React from "react"
import { cn } from "@/lib/utils"
import { getTypeConfig } from "@/lib/type-config"

interface TypeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

const TypeBadge = React.forwardRef<HTMLDivElement, TypeBadgeProps>(
  ({ className, type, size = 'md', showIcon = true, ...props }, ref) => {
    const config = getTypeConfig(type)
    
    if (!config) {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
            "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
            className
          )}
          {...props}
        >
          {type}
        </div>
      )
    }

    const Icon = config.icon
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-0.5 text-xs gap-1.5', 
      lg: 'px-3 py-1 text-sm gap-2'
    }
    
    const iconSizes = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4'
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border font-semibold transition-colors",
          sizeClasses[size],
          config.color,
          config.darkColor,
          config.bgColor,
          config.darkBgColor,
          config.borderColor,
          config.darkBorderColor,
          className
        )}
        {...props}
      >
        {showIcon && <Icon className={iconSizes[size]} />}
        <span>{type}</span>
      </div>
    )
  }
)
TypeBadge.displayName = "TypeBadge"

export { TypeBadge }