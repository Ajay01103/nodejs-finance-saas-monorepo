import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useTypedSelector } from "@/app/hook"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  email: z.string(),
  frequency: z.string(),
  isEnabled: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

const ScheduleReportForm = ({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void
}) => {
  //const dispatch = useAppDispatch();
  const { user, reportSetting } = useTypedSelector((state) => state.auth)

  // const [updateReportSetting,{isLoading}] = useUpdateReportSettingMutation();

  const isLoading = false

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      isEnabled: reportSetting?.isEnabled || true,
      frequency: reportSetting?.frequency || "MONTHLY",
    },
  })

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const payload = { isEnabled: values.isEnabled }
    console.log("Form submitted:", payload)
    onCloseDrawer()
    // updateReportSetting(payload).unwrap().then(() => {
    //   dispatch(updateCredentials({reportSetting: payload}))
    //   onCloseDrawer();
    //   toast.success("Report setting updated successfully");
    // }).catch((error) => {
    //   toast.error(error.data.message || "Failed to update report setting");
    // })
  }

  // Get summary text based on form values
  const getScheduleSummary = () => {
    if (!form.watch("isEnabled")) {
      return "Reports are currently deactivated"
    }
    return "Report will be sent once a month on the 1st day of the next month"
  }

  return (
    <div className="px-2.5 pt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
          <div className="w-full flex-1 space-y-6 px-4">
            {/* Enable/Disable Switch */}
            <FormField
              control={form.control}
              name="isEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Monthly Reports</FormLabel>
                    <p className="text-muted-foreground text-sm">
                      {form.watch("isEnabled")
                        ? "Reports activated"
                        : "Reports deactivated"}
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="relative space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Enter email address"
                          disabled={true}
                          {...field}
                          className="flex-1"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Frequency */}
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat On</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={true}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MONTHLY">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Disabled overlay */}
              {!form.watch("isEnabled") && (
                <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50" />
              )}
            </div>

            {/* Schedule Summary */}
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-medium">Schedule Summary</h3>
              <p className="text-muted-foreground text-sm">
                {getScheduleSummary()}
              </p>
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 z-50 py-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-white">
                {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ScheduleReportForm
