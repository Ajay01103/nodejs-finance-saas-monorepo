import { Menu } from "lucide-react"
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useTypedSelector } from "@/app/hook"
import { cn } from "@/lib/utils"
import { PROTECTED_ROUTES } from "@/routes/common/routePath"
import Logo from "../logo/logo"
import { Button } from "../ui/button"
import { Sheet, SheetContent } from "../ui/sheet"
import LogoutDialog from "./logout-dialog"
import { UserNav } from "./user-nav"

const Navbar = () => {
  const { pathname } = useLocation()
  const { user } = useTypedSelector((state) => state.auth)

  const [isOpen, setIsOpen] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  const routes = [
    {
      href: PROTECTED_ROUTES.OVERVIEW,
      label: "Overview",
    },
    {
      href: PROTECTED_ROUTES.TRANSACTIONS,
      label: "Transactions",
    },
    {
      href: PROTECTED_ROUTES.REPORTS,
      label: "Reports",
    },
    {
      href: PROTECTED_ROUTES.SETTINGS,
      label: "Settings",
    },
  ]

  return (
    <>
      <header
        className={cn(
          "w-full bg-[var(--secondary-dark-color)] px-4 py-3 pb-3 text-white lg:px-14",
          pathname === PROTECTED_ROUTES.OVERVIEW && "!pb-3"
        )}>
        <div className="mx-auto flex h-14 w-full max-w-[var(--max-width)] items-center">
          <div className="flex w-full items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="!cursor-pointer !bg-white/10 !text-white inline-flex hover:bg-white/10 md:hidden"
                onClick={() => setIsOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>

              <Logo />
            </div>

            {/* Navigation*/}
            <nav className="hidden items-center gap-x-2 overflow-x-auto md:flex">
              {routes?.map((route) => (
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "transtion !bg-transparent !text-[14.5px] w-full border-none py-4.5 font-normal text-white/60 hover:text-white focus:bg-white/30 lg:w-auto",
                    pathname === route.href && "text-white"
                  )}
                  asChild>
                  <NavLink
                    key={route.href}
                    to={route.href}>
                    {route.label}
                  </NavLink>
                </Button>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}>
              <SheetContent
                side="left"
                className="bg-white">
                <nav className="flex flex-col gap-y-2 pt-9">
                  {routes?.map((route) => (
                    <Button
                      size="sm"
                      variant="ghost"
                      className={cn(
                        "transtion !bg-transparent w-full justify-start border-none py-4.5 font-normal text-black/70 hover:bg-white/10 hover:text-black focus:bg-white/30",
                        pathname === route.href && "!bg-black/10 text-black"
                      )}
                      asChild>
                      <NavLink
                        key={route.href}
                        to={route.href}>
                        {route.label}
                      </NavLink>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* {} */}
            {/* Right side - User actions */}
            <div className="flex items-center space-x-4">
              <UserNav
                userName={user?.name || ""}
                profilePicture={user?.profilePicture || ""}
                onLogout={() => setIsLogoutDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        setIsOpen={setIsLogoutDialogOpen}
      />
    </>
  )
}

export default Navbar
