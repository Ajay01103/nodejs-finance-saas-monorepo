import { GalleryVerticalEnd } from "lucide-react"
import { Link } from "react-router-dom"
import { PROTECTED_ROUTES } from "@/routes/common/routePath"

const Logo = (props: { url?: string }) => {
  return (
    <Link
      to={props.url || PROTECTED_ROUTES.OVERVIEW}
      className="flex items-center gap-2">
      <div className="flex h-6.5 w-6.5 items-center justify-center rounded bg-green-500 text-white">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <span className="font-semibold text-lg">Finora</span>
    </Link>
  )
}

export default Logo
