import Logo from "@/components/logo/logo"
import { useTheme } from "@/context/theme-provider"
import dashboardImg from "../../assets/images/dashboard_.png"
import dashboardImgDark from "../../assets/images/dashboard_dark.png"
import SignUpForm from "./_component/signup-form"

const SignUp = () => {
  const { theme } = useTheme()
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 md:pt-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo url="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="-mt-3 relative hidden bg-muted lg:block">
        <div className="absolute inset-0 flex flex-col items-end justify-end pt-8 pl-8">
          <div className="mx-0 w-full max-w-3xl pr-5">
            <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
              Hi, I'm your AI-powered personal finance app, Finora!
            </h1>
            <p className="mt-4 text-gray-600 dark:text-muted-foreground">
              Finora provides insights, monthly reports, CSV import, recurring
              transactions, all powered by advanced AI technology. 🚀
            </p>
          </div>
          <div className="relative mt-3 h-full w-full max-w-3xl overflow-hidden">
            <img
              src={theme === "dark" ? dashboardImgDark : dashboardImg}
              alt="Dashboard"
              className="absolute top-0 left-0 h-full w-full object-cover"
              style={{
                objectPosition: "left top",
                transform: "scale(1.2)",
                transformOrigin: "left top",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
