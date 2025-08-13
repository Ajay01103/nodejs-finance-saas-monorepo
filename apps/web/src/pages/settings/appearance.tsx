import { Separator } from "@/components/ui/separator"
import { AppearanceTheme } from "./_components/appearance-theme"

const Appearance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Appearance</h3>
        <p className="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceTheme />
    </div>
  )
}

export default Appearance
