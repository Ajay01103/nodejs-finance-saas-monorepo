import { Separator } from "@/components/ui/separator"
import { AccountForm } from "./_components/account-form"

const Account = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}

export default Account
