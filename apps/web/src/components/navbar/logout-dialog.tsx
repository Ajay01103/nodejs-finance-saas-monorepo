import { Loader } from "lucide-react"
import { useTransition } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/app/hook"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { logout } from "@/features/auth/authSlice"
import { AUTH_ROUTES } from "@/routes/common/routePath"
import { Button } from "../ui/button"

interface LogoutDialogProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const LogoutDialog = ({ isOpen, setIsOpen }: LogoutDialogProps) => {
  const [isPending, startTransition] = useTransition()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    startTransition(() => {
      setIsOpen(false)
      dispatch(logout())
      navigate(AUTH_ROUTES.SIGN_IN)
    })
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogDescription>
            This will end your current session and you will need to log in again
            to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="!bg-red-500 text-white"
            disabled={isPending}
            type="button"
            onClick={handleLogout}>
            {isPending && <Loader className="animate-spin" />}
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutDialog
