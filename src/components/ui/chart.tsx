import React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

export function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn("flex aspect-video justify-center text-xs", className)}
          style={{
            '--color-desktop': config.desktop?.color || '#2563eb',
            '--color-mobile': config.mobile?.color || '#60a5fa',
          } as React.CSSProperties}
          {...props}
        >
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

export const ChartTooltip = RechartsPrimitive.Tooltip

interface ChartTooltipContentProps extends React.ComponentProps<"div"> {
  active?: boolean
  payload?: any[]
  label?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  nameKey?: string
  labelKey?: string
}

export const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ active, payload, className, hideLabel = false }, ref) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        <div className="grid gap-1.5">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex w-full items-center gap-2">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-mono font-medium tabular-nums text-foreground ml-auto">
                {item.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export const ChartLegend = RechartsPrimitive.Legend
export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: any[]
    hideIcon?: boolean
  }
>(({ className, payload, hideIcon = false }, ref) => {
  if (!payload?.length) {
    return null
  }

  return (
    <div ref={ref} className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((item: any) => (
        <div key={item.value} className="flex items-center gap-1.5">
          {!hideIcon && (
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: item.color }}
            />
          )}
          <span className="text-sm">{item.value}</span>
        </div>
      ))}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"