import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "@/context/theme-provider"

export function AppearanceTheme() {
  const { theme, setTheme } = useTheme()

  const [selectedTheme, setSelectedTheme] = useState(theme)

  const handleThemeChange = (value: "light" | "dark") => {
    setSelectedTheme(value)
  }

  const handleUpdateTheme = () => {
    setTheme(selectedTheme)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Theme</h4>
        <p className="text-muted-foreground text-sm">
          Select the theme for the dashboard.
        </p>
        <RadioGroup
          value={selectedTheme}
          onValueChange={handleThemeChange}
          className="flex max-w-md flex-col items-start gap-5 pt-2 md:flex-row md:items-center">
          <div>
            <Label className="flex flex-col [&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem
                value="light"
                className="sr-only"
              />
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <p className="!block w-full p-2 text-center font-normal">Light</p>
            </Label>
          </div>
          <div>
            <Label className="flex flex-col [&:has([data-state=checked])>div]:border-primary">
              <RadioGroupItem
                value="dark"
                className="sr-only"
              />
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <p className="block w-full p-2 text-center font-normal">Dark</p>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        type="button"
        className="mt-4 text-white"
        onClick={handleUpdateTheme}>
        Update preferences
      </Button>
    </div>
  )
}
