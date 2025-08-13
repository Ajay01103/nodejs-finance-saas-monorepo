import { ScanText } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import type { AIScanReceiptData } from "@/features/transaction/transationType"
import { useProgressLoader } from "@/hooks/use-progress-loader"

interface ReceiptScannerProps {
  loadingChange: boolean
  onScanComplete: (data: AIScanReceiptData) => void
  onLoadingChange: (isLoading: boolean) => void
}

const ReceiptScanner = ({
  loadingChange,
  onScanComplete,
  onLoadingChange,
}: ReceiptScannerProps) => {
  const [receipt, setReceipt] = useState<string | null>(null)

  const {
    progress,
    startProgress,
    updateProgress,
    doneProgress,
    resetProgress,
  } = useProgressLoader({ initialProgress: 10, completionDelay: 500 })

  // const [aiScanReceipt] = useAiScanReceiptMutation()

  const handleReceiptUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) {
      toast.error("Please select a file")
      return
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }
    const formData = new FormData()
    formData.append("receipt", file)

    startProgress(10)
    onLoadingChange(true)
    // Simulate file upload and processing
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setReceipt(result)

      // Simulate scanning progress
      // Start progress
      let currentProgress = 10
      const interval = setInterval(() => {
        const increment = currentProgress < 90 ? 10 : 1
        currentProgress = Math.min(currentProgress + increment, 90)
        updateProgress(currentProgress)
      }, 250)

      setTimeout(() => {
        clearInterval(interval)

        onScanComplete({
          title: "Netflix Subscription",
          amount: 15.99,
          date: new Date().toISOString(),
          description: "Monthly Netflix Subscription",
          category: "Netflix",
          paymentMethod: "CARD",
          receiptUrl: result,
          type: "EXPENSE",
        })
        doneProgress()
        resetProgress()
        setReceipt(null)
        onLoadingChange(false)
      }, 2000)

      // aiScanReceipt(formData).unwrap().then((res) => {
      //   updateProgress(100)
      //   onScanComplete(res.data);
      //   toast.success("Receipt scanned successfully");
      // }).catch((error) => {
      //   toast.error(error.data?.message || "Failed to scan receipt");
      // })
      // .finally(() => {
      //   clearInterval(interval);
      //   resetProgress();
      //   setReceipt(null);
      //   onLoadingChange(false);
      // })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-3">
      <Label className="font-medium text-sm">AI Scan Receipt</Label>
      <div className="flex items-start gap-3 border-b pb-4">
        {/* Receipt Preview */}
        <div
          className={`h-12 w-12 rounded-md border bg-center bg-cover ${
            !receipt ? "bg-muted" : ""
          }`}
          style={receipt ? { backgroundImage: `url(${receipt})` } : {}}>
          {!receipt && (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <ScanText
                color="currentColor"
                className="!stroke-1.5 h-5 w-5"
              />
            </div>
          )}
        </div>

        {/* Upload Input or Progress */}
        <div className="flex-1">
          {!loadingChange ? (
            <>
              <Input
                type="file"
                accept="image/*"
                onChange={handleReceiptUpload}
                className="h-9 max-w-[250px] cursor-pointer px-1 text-sm file:mr-2 file:rounded file:border-0 file:bg-primary file:px-3 file:py-px file:font-medium file:text-sm file:text-white hover:file:bg-primary/90"
                disabled={loadingChange}
              />
              <p className="mt-2 px-2 text-[11px] text-muted-foreground">
                JPG, PNG up to 5MB
              </p>
            </>
          ) : (
            <div className="space-y-2 pt-3">
              <Progress
                value={progress}
                className="h-2 w-[250px]"
              />
              <p className="text-muted-foreground text-xs">
                Scanning receipt... {progress}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReceiptScanner
