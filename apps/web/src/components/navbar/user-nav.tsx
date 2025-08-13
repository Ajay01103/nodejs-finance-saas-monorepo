import { ChevronDown, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function UserNav({
  userName,
  profilePicture,
  onLogout,
}: {
  userName: string
  profilePicture: string
  onLogout: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="!bg-transparent !gap-0 relative h-8 w-8 rounded-full">
          <Avatar className="!cursor-pointer h-10 w-10">
            <AvatarImage
              src={profilePicture || ""}
              className="!cursor-pointer"
            />
            <AvatarFallback className="!bg-[var(--secondary-dark-color)] !border-gray-700 !text-white border">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="!w-3 !h-3 ml-1 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="!bg-[var(--secondary-dark-color)] !text-white !border-gray-700 w-56"
        align="end"
        forceMount>
        <DropdownMenuLabel className="flex flex-col items-start gap-1">
          <span className="font-semibold">{userName}</span>
          <span className="font-light text-[13px] text-gray-400">
            Free Trial (2 days left)
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="!bg-gray-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="hover:!bg-gray-800 hover:!text-white"
            onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
