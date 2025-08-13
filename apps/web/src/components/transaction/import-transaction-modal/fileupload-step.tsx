import { FileUp } from "lucide-react"
import { useRef } from "react"
import { usePapaParse } from "react-papaparse"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { MAX_FILE_SIZE, MAX_IMPORT_LIMIT } from "@/constant"
import { useProgressLoader } from "@/hooks/use-progress-loader"

interface CsvRow {
  [key: string]: string | undefined // Define that rows can be indexed with strings
}

type FileUploadStepProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileUpload: (file: File, columns: any[], data: any[]) => void
}

const FileUploadStep = ({ onFileUpload }: FileUploadStepProps) => {
  const { readString } = usePapaParse()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    progress,
    isLoading,
    startProgress,
    updateProgress,
    doneProgress,
    resetProgress,
  } = useProgressLoader({ initialProgress: 10, completionDelay: 500 })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024} MB`
      )
      return
    }
    resetProgress() // Clear any previous progress
    startProgress()

    try {
      // First read the file as text
      const fileText = await file.text()
      // Then parse the CSV text
      readString<CsvRow>(fileText, {
        header: true,
        skipEmptyLines: true,
        fastMode: true,
        complete: (results) => {
          console.log(results, "results")
          if (results.data.length > MAX_IMPORT_LIMIT) {
            toast.error(
              `You can only import up to ${MAX_IMPORT_LIMIT} transactions.`
            )
            resetProgress()
            return
          }

          updateProgress(40)

          const columns =
            results.meta.fields?.map((name: string) => ({
              id: name,
              name,
              sampleData:
                results.data[0]?.[name]?.slice(0, MAX_IMPORT_LIMIT) || "",
            })) || []

          doneProgress()

          setTimeout(() => {
            onFileUpload(file, columns, results.data)
          }, 500)
        },
        error: (error) => {
          console.error("Error parsing CSV:", error)
          resetProgress()
        },
      })
    } catch (error) {
      console.error("Error reading file:", error)
      resetProgress()
    }
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Upload CSV File</DialogTitle>
        <DialogDescription>
          Select a CSV file containing your transaction data
        </DialogDescription>
      </DialogHeader>

      <div
        className="w-full rounded-lg border-2 border-dashed text-center"
        style={{
          padding: "32px",
        }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          className="hidden"
        />

        <Button
          size="lg"
          className="!bg-[var(--secondary-dark-color)] min-w-44 text-white"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}>
          <FileUp className="h-6.5 w-6.5" />
          Select File
        </Button>

        {fileInputRef.current?.files?.[0] ? (
          <p className="mt-4 text-muted-foreground text-sm">
            Selected: {fileInputRef.current?.files?.[0].name}
          </p>
        ) : (
          <div className="mt-3 text-muted-foreground text-xs">
            Maximum file size: 5MB
          </div>
        )}

        {isLoading && (
          <div className="mt-4 space-y-2">
            <Progress
              value={progress}
              className="h-2"
            />
            <p className="text-muted-foreground text-xs">
              Parsing file... {progress}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUploadStep
